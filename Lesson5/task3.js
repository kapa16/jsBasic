/*jslint node: true */
"use strict";

const btn = document.querySelector('button');
btn.addEventListener('click', checkForm);

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

const form = {
  elem: {},

  getElem (elemId) {
    this.elem = document.getElementById(elemId);
    return this.elem;
  },

  checkName() {
    return this.elem.value.length <= 0 || this.elem.value.length > 50;
  },

  checkPhone() {
    return this.elem.value.length !== 11 || this.elem.value.replace(/\d/g, '').length !== 0;
  },

  checkPass() {
    return this.elem.value.length < 5 || this.elem.value.length > 50;
  },

  checkConfirm(pass) {
    return this.elem.value !== document.getElementById(pass).value;
  },

  checkElement(elemId, pass) {
    const elem = form.getElem(elemId.toLowerCase());
    const result = form['check' + elemId](pass);
    showErrorCorrect(elem, result);
    return result;
  }

};

function checkForm(event) {

  let error = false;

  error = form.checkElement('Name') || error;
  error = form.checkElement('Phone') || error;
  error = form.checkElement('Pass') || error;
  error = form.checkElement('Confirm', 'pass') || error;

  if (error) {
    event.preventDefault();
  }
}
