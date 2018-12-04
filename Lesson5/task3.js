/*jslint node: true */
"use strict";

const btn = document.querySelector('button');
btn.addEventListener('click', checkForm);

function checkForm(event) {
  event.preventDefault();
  const name = document.getElementById('name');
  console.log(name);
  if (name.value.length > 0 && name.value.length <= 50) {
    name.classList.add('right');
    name.classList.remove('error');
  } else {
    name.classList.add('error');
    name.classList.remove('right');
  }
}