const menuButton = document.querySelector('.header__main-ham-menu-cont')
const openIcon = document.querySelector('.header__main-ham-menu')
const closeIcon = document.querySelector('.header__main-ham-menu-close')
const menu = document.querySelector('.header__sm-menu')

if (menuButton && openIcon && closeIcon && menu) {
  /**
   * Opens or closes the small screen menu and keeps the button icon, the
   * menu itself and the state announced to assistive technology in step.
   *
   * @param {boolean} open
   */
  const setMenu = (open) => {
    menu.classList.toggle('header__sm-menu--active', open)
    openIcon.classList.toggle('d-none', open)
    closeIcon.classList.toggle('d-none', !open)
    menuButton.setAttribute('aria-expanded', String(open))
  }

  setMenu(false)

  menuButton.addEventListener('click', () => {
    setMenu(!menu.classList.contains('header__sm-menu--active'))
  })

  // Every link in the menu points at a section of the page behind it, so the
  // menu has to get out of the way once one is taken.
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false)
  })
}

const revealTargets = document.querySelectorAll('.reveal')

if (revealTargets.length) {
  // A group hands its own children a rising delay, so a heading and the
  // paragraphs under it arrive one after the other rather than all at once.
  document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
    const step = group.children.length > 8 ? 35 : 80
    Array.from(group.children)
      .filter((child) => child.classList.contains('reveal'))
      .forEach((child, index) => {
        child.style.setProperty('--reveal-delay', `${index * step}ms`)
      })
  })

  const show = (element) => element.classList.add('reveal--visible')

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(show)
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

    revealTargets.forEach((element) => observer.observe(element))
  }
}
