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

