import * as THREE from 'three'

/**
 * The hero background: the same field of flat triangles it has always been,
 * given a very slow swell. Each facet tilts a little as the surface passes
 * under it, so the light moves across the frame the way it moves on water.
 *
 * Nothing here is fast. The waves are long, the amplitude is a fraction of a
 * facet, and the whole thing is redrawn thirty times a second rather than
 * sixty, because at this speed nobody can tell and it halves the work.
 *
 * The stylesheet paints the original background underneath, so a blocked
 * script, a machine without WebGL or a visitor who asked for less motion is
 * left with the hero exactly as it was.
 */

const hero = document.querySelector('.home-hero')
const canvas = document.querySelector('.home-hero__canvas')
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

if (hero && canvas) {
  const SEGMENTS_X = 88
  const SEGMENTS_Y = 58
  const FRAME = 1 / 30

  const SWELL = [
    { x: 0.055, y: 0.041, speed: 0.10, height: 5.0 },
    { x: 0.021, y: 0.076, speed: -0.07, height: 3.8 },
    { x: 0.101, y: 0.013, speed: 0.14, height: 2.0 },
  ]

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 400)
  camera.position.set(0, 0, 60)

  const geometry = new THREE.PlaneGeometry(320, 210, SEGMENTS_X, SEGMENTS_Y)
  const rest = Float32Array.from(geometry.attributes.position.array)

  const surface = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: 0x333333,
      flatShading: true,
      roughness: 0.95,
      metalness: 0,
    })
  )
  // Off square to the camera, so the light falls unevenly across the frame.
  surface.rotation.set(-0.16, 0.08, 0.05)
  scene.add(surface)

  // Grazing light is what makes a facet that tilted by two degrees read as
  // different from its neighbour. Lit from the front, the swell is invisible.
  scene.add(new THREE.AmbientLight(0xffffff, 0.22))
  const key = new THREE.DirectionalLight(0xffffff, 2.4)
  key.position.set(-70, 42, 12)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.8)
  fill.position.set(58, -30, 16)
  scene.add(fill)

  const point = geometry.attributes.position

  const swell = (time) => {
    for (let i = 0; i < point.count; i += 1) {
      const x = rest[i * 3]
      const y = rest[i * 3 + 1]
      let z = 0
      for (const wave of SWELL) {
        z += Math.sin(x * wave.x + y * wave.y + time * wave.speed) * wave.height
      }
      point.setZ(i, z)
    }
    point.needsUpdate = true
    geometry.computeVertexNormals()
  }

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = hero
    renderer.setSize(w, h, false)
    camera.aspect = w / Math.max(h, 1)
    camera.updateProjectionMatrix()
  }

  const draw = (time) => {
    swell(time)
    renderer.render(scene, camera)
  }

  let running = false
  let frame = 0
  let due = 0

  const loop = (now) => {
    if (!running) return
    const time = now / 1000
    if (time >= due) {
      due = time + FRAME
      draw(time)
    }
    frame = requestAnimationFrame(loop)
  }

  const start = () => {
    if (running || reduced.matches) return
    running = true
    due = 0
    frame = requestAnimationFrame(loop)
  }

  const stop = () => {
    running = false
    cancelAnimationFrame(frame)
  }

  resize()
  draw(0)

  window.addEventListener('resize', () => {
    resize()
    if (!running) draw(0)
  })

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()))
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
    threshold: 0,
  }).observe(hero)

  reduced.addEventListener('change', () => (reduced.matches ? stop() : start()))
}
