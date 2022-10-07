/**
 * Created by ASTAKHOV A.A. on 01.10.2022
 */

document.querySelector('.hamburger').addEventListener(' click', function (e) {
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

document.querySelectorAll('form').forEach((form) => {
    form.querySelectorAll('input[required]').forEach((input) => {
        input.closest('.input-group').querySelector('label').classList.add('required');
    })
})

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;

    const DATA_TYPE = {
        DIGIT: 'DIGIT',
        WORD: 'WORD',
    }

    form.querySelectorAll('input').forEach((input) => {
        const type = input.type;
        const value = input.value;

        const dataType = input.dataset.type;

        const appendErrorMessage = (message = 'Заполните поле корректно') => {
            input.insertAdjacentHTML('afterend', `<span class="input-group-error">${message}</span>`);
        }

        const invalid = () => {
            input.classList.add('invalid');

            const error = input.parentElement.querySelector('.input-group-error');

            if (!error) {
                switch (type) {
                    case 'tel':
                    case 'email':
                        appendErrorMessage();

                        break;
                    case 'number':
                        appendErrorMessage('Значение должно быть в диапазоне с ... до ...');

                        break;
                    default:
                        appendErrorMessage('Поле должно содержать ...');

                        break;
                }
            }
        }

        const valid = () => {
            input.classList.remove('invalid');

            input.parentElement.querySelector('.input-group-error')?.remove();
        }

        valid();

        switch (type) {
            case 'text':
                if (!input.checkValidity()) {
                    invalid();

                    return false;
                }

                if (dataType === DATA_TYPE.WORD) {
                    const regexp = /^[A-Za-zА-Яа-яЁё\s]+$/;

                    if (!value.match(regexp)) {
                        invalid();
                    }
                }

                if (dataType === DATA_TYPE.DIGIT) {
                    const regexp = /^[0-9]+$/;

                    if (!value.match(regexp)) {
                        invalid();
                    }
                }

                break;
            default:
                if (!input.checkValidity()) {
                    invalid();
                }

                break;
        }
   })
});
