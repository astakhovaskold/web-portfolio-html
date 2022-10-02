/**
 * Created by ASTAKHOV A.A. on 01.10.2022
 */

document.querySelector('.hamburger').addEventListener('click', function (e) {
    const hamburger = e.currentTarget;
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    hamburger.classList.toggle('open');
    hamburgerMenu.classList.toggle('open');
})