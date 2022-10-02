/**
 * Created by ASTAKHOV A.A. on 01.10.2022
 */

document.querySelector('.hamburger').addEventListener('click', function (e) {
    const hamburger = e.currentTarget;
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.overlay');

    hamburger.classList.toggle('open');
    hamburgerMenu.classList.toggle('open');
    overlay.classList.toggle('open');
})
