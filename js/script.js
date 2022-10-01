/**
 * Created by ASTAKHOV A.A. on 01.10.2022
 */

document.querySelector('.hamburger').addEventListener('click', function (e) {
    const hamburger = e.currentTarget;

    hamburger.classList.toggle('open');
})
