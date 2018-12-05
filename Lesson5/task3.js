/*jslint node: true */
"use strict";

const btn = document.querySelector('button');
btn.addEventListener('click', checkForm);

/**
 * Вывод ошибки или корректности ввода в документ
 * @param {object} elem - элемент HTML для вывода информации
 * @param {boolean} error - если ошибка - true
 */
function showErrorCorrect(elem, error) {
  const label = elem.parentNode.querySelector('.form__label');
  if (error) {
    elem.classList.remove('right');
    elem.classList.add('error');
    label.classList.add('display_block');
  } else {
    elem.classList.add('right');
    elem.classList.remove('error');
    label.classList.remove('display_block');
  }
}

/**
 * Объект для работы с формой
 */
const form = {
  elem: {},

  /**
   * Заполняет и возвращает элемент по его id
   * @param {string} elemId - id HTML элемента
   * @returns {object} - HTML элемент по его id
   */
  getElem(elemId) {
    return document.getElementById(elemId);
  },

  /**
   * Проверка имени пользователя
   * @returns {boolean} - результат проверки, если ошибка, то true
   */
  checkName() {
    return this.elem.value.length <= 0 || this.elem.value.length > 50;
  },

  /**
   * Проверка телефона
   * @returns {boolean} - результат проверки, если ошибка, то true
   */
  checkPhone() {
    return this.elem.value.length !== 11 || this.elem.value.replace(/\d/g, '').length !== 0;
  },

  /**
   * Проверка пароля
   * @returns {boolean} - результат проверки, если ошибка, то true
   */
  checkPass() {
    return this.elem.value.length < 5 || this.elem.value.length > 50;
  },

  /**
   * Проверка подтверждения пароля
   * @param {string} pass - id HTML элемента пароля
   * @returns {boolean} - результат проверки, если ошибка, то true
   */
  checkConfirm(pass) {
    return this.elem.value !== this.getElem(pass).value;
  },

  /**
   * Проверка элемента и вызов функции показывающей / убирающей ошибку
   * @param {string} elemId - id HTML элемента для проверки с большой буквы
   * @param {string} pass - id HTML пароля для сравнения с подтверждением
   * @returns {boolean} - результат проверки, если ошибка, то true
   */
  checkElement(elemId, pass) {
    this.elem = form.getElem(elemId.toLowerCase());
    const result = form['check' + elemId](pass);
    showErrorCorrect(this.elem, result);
    return result;
  }
};

/**
 * Обработчик события проверки полей формы
 * @param event - событие, вызвавшее обработчик
 */
function checkForm(event) {

  let error = false;

  error = form.checkElement('Name', '') || error;
  error = form.checkElement('Phone', '') || error;
  error = form.checkElement('Pass', '') || error;
  error = form.checkElement('Confirm', 'pass') || error;

  if (error) {
    event.preventDefault();
  }
}
