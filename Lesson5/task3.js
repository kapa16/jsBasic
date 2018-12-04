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

function checkForm(event) {

  let error = true;

  const name = document.getElementById('name');
  let result = name.value.length <= 0 || name.value.length > 50;
  error = error || result;
  showErrorCorrect(name, result);

  const phone = document.getElementById('phone');
  const valuePhone = phone.value;
  result = valuePhone.length !== 11 || valuePhone.replace(/\d/g, '').length !== 0;
  error = error || result;
  showErrorCorrect(phone, result);

  const pass = document.getElementById('pass');
  result = pass.value.length < 5 || pass.value.length > 50;
  error = error || result;
  showErrorCorrect(pass, result);

  const confirmPass = document.getElementById('confirm-pass');
  result = confirmPass.value !== pass.value;
  error = error || result;
  showErrorCorrect(confirmPass, result);
//todo исправить error
  if (error) {
    event.preventDefault();
  }

}