(function () {
  var mainHeader = document.querySelector(".main-header");
  var hamburgerOpenMenu = document.querySelector(".main-nav__toggle");
  var menuList = document.querySelector(".main-nav__list");

  function toggleMenu (event) {
    event.preventDefault();
    mainHeader.classList.toggle("main-header--open-menu");
    hamburgerOpenMenu.classList.toggle("main-nav__toggle-close");
    menuList.classList.toggle("main-nav__list--open");
  }

  hamburgerOpenMenu.addEventListener("tap", toggleMenu);
})();
