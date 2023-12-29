const menuButton = document.querySelector('.header__main-ham-menu-cont')
const openIcon = document.querySelector('.header__main-ham-menu')
const closeIcon = document.querySelector('.header__main-ham-menu-close')
const menu = document.querySelector('.header__sm-menu')

if (menuButton && openIcon && closeIcon && menu) {
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

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false)
  })
}
