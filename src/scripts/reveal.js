const STAGGER_STEP = 80
const STAGGER_STEP_DENSE = 35
const DENSE_GROUP = 8

const targets = document.querySelectorAll('.reveal')

if (targets.length) {
  document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
    const step = group.children.length > DENSE_GROUP ? STAGGER_STEP_DENSE : STAGGER_STEP
    Array.from(group.children)
      .filter((child) => child.classList.contains('reveal'))
      .forEach((child, index) => {
        child.style.setProperty('--reveal-delay', `${index * step}ms`)
      })
  })

  const show = (element) => element.classList.add('reveal--visible')

  if (!('IntersectionObserver' in window)) {
    targets.forEach(show)
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          show(entry.target)
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )

    targets.forEach((element) => observer.observe(element))
  }
}
