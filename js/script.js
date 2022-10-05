/**
 * Created by ASTAKHOV A.A. on 01.10.2022
 */

document.querySelector('.hamburger').addEventListener('click', function (e) {
    const hamburger = e.currentTarget;
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const overlay = hamburgerMenu.closest('.overlay');

    overlay.classList.toggle('open');

    hamburger.classList.toggle('open');
    hamburgerMenu.classList.toggle('open');
})

document.querySelector('[data-modal="open"]').addEventListener('click', function (e) {
    const button = e.currentTarget;

    const modal = document.querySelector(button.dataset.target);
    const overlay = modal.closest('.overlay');

    overlay.classList.add('open');
    modal.classList.add('open');
})

document.querySelector('[data-modal="close"]').addEventListener('click', function (e) {
    const button = e.currentTarget;

    const modal = button.closest('.modal');
    const overlay = button.closest('.overlay');

    overlay.classList.remove('open');
    modal.classList.remove('open');
})

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;

    if (form.checkValidity()) {
        form.submit();
    }
})
