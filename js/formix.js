/**
 * Created by ASTAKHOV A.A. on 15.10.2022
 */

(function () {
    class Formix {
        prefix = 'formix';

        constructor(selector, {
            validateOnInput = false,
            validateOnSubmit = true,
            isStyledComponentsEnabled = false
        } = {}) {
            this.collection = document.querySelectorAll(selector);

            this.collection.forEach((form) => {
                form.querySelectorAll('input, textarea').forEach((input) => {
                    if (input.hasAttribute('required')) {
                        input.closest('.input-group').querySelector('label').classList.add('required');
                    }

                    if (validateOnInput) input.addEventListener('input', (e) => this.validateFormItem(e.target));
                })

                if (validateOnSubmit) {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();

                        const form = e.target;

                        this.validateFormOnSubmit(form);
                    })
                }

                if (isStyledComponentsEnabled) {
                    form.querySelectorAll('select').forEach((select) => this.createSelect(select));
                }
            })
        }

        uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        validateFormOnSubmit(form) {
            form.querySelectorAll('input, textarea').forEach(this.validateFormItem);

            if (!form.querySelectorAll('input.invalid, textarea.invalid')?.length) form.submit();
        }

        validateFormItem(input) {
            const {value, type} = input;

            const dataType = input.dataset?.type;

            const DATA_TYPE = {
                DIGIT: 'DIGIT',
                WORD: 'WORD',
            }

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
                        case 'number': {
                            // деструктуризация
                            const {min, max} = input;

                            const message = () => {
                                if (!min || !max) return 'Заполните поле корректно';

                                return `Значение должно быть в диапазоне${min ? ` c ${min}` : ''}${max ? ` до ${max}` : ''}`;
                            }

                            appendErrorMessage(message());
                        }

                            break;
                        default: {
                            const {value} = input;
                            const dataType = input.dataset?.type;

                            const message = () => {
                                if (!value || value && !dataType) return 'Заполните поле корректно';

                                if (dataType === DATA_TYPE.WORD) return 'Поле не должно содержать цифры';

                                if (dataType === DATA_TYPE.DIGIT) return 'Поле должно содержать только цифры';
                            }

                            appendErrorMessage(message());
                        }

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
        }

        createFormItem(element) {
            const formItem = document.createElement('div');
            formItem.className = `${this.prefix}-form-item`;

            formItem.appendChild(element);

            return formItem;
        }

        createOption({option}) {
            const uuid = this.uuid();

            const optionStyled = document.createElement('span');

            optionStyled.className = `${this.prefix}-option`;
            optionStyled.textContent = option.textContent;
            optionStyled.dataset.uuid = uuid;

            option.dataset.uuid = uuid;

            return optionStyled;
        }

        createSelect(select) {
            select.style.display = 'none';

            const selectID = this.uuid();
            select.dataset.uuid = selectID;

            const createSelectStyled = (callback) => {
                const select = document.createElement('div');

                select.className = `${this.prefix}-select`;

                if (typeof callback === 'function') {
                    return callback(select);
                }

                return select;
            }

            const createOptionListStyled = (callback, {selectStyled}) => {
                const optionList = document.createElement('div');

                optionList.className = `${this.prefix}-option-list`;
                optionList.style.display = 'none';
                optionList.style.top = `${selectStyled?.offsetHeight || 56}px`;

                if (typeof callback === 'function') {
                    return callback(optionList);
                }

                return optionList;
            }

            const appendOptions = ({options, appendTo, showFirstOnly = false}) => {
                options.forEach((option, index) => {
                    const optionStyled = this.createOption({option});

                    if (!showFirstOnly && index === 0 || option.selected) {
                        appendTo.appendChild(optionStyled);
                    }
                })

                return appendTo;
            }

            const options = select.querySelectorAll('option');

            const selectStyled = createSelectStyled((select) => appendOptions({options, appendTo: select, showFirstOnly: true}));

            const formItem = this.createFormItem(selectStyled);
            select.after(formItem);

            const optionListStyled = createOptionListStyled((optionList) => appendOptions({options, appendTo: optionList}), {selectStyled});
            formItem.appendChild(optionListStyled);

            selectStyled.addEventListener('click', () => {
                const display = optionListStyled.style.display;
                display === 'none' ? optionListStyled.style.display = 'flex' : optionListStyled.style.display = 'none';
            })

            optionListStyled.querySelectorAll(`.${this.prefix}-option`).forEach((option) => {
                option.addEventListener('click', (e) => {
                    const current = e.currentTarget;
                    const uuid = current.dataset.uuid;

                    const select = document.querySelector(`select[data-uuid="${selectID}"]`);
                    const value = document.querySelector(`option[data-uuid="${uuid}"]`)?.value;
                    select.value = value;

                    selectStyled.querySelector(`.${this.prefix}-option`).replaceWith(current.cloneNode(true));
                    optionListStyled.style.display = 'none';
                });
            })
        }
    }

    window.Formix = Formix;
})();
