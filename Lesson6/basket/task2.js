/*jslint node: true */
"use strict";

const products = {
  productsArray: [],

  getProducts() {
    for (let i = 0; i < 4; i++) {
      const product = {
        imagePath: `img/product${i + 1}.jpg`,
        alt: `product${i + 1}`,
        name: `Товар ${i + 1}`,
        price: (i + 1) * 1000,
      };

      this.productsArray.push(product);
    }
  },

  showProducts() {
    this.productsArray.forEach(product => this.generateHTML(product))
  },

  generateHTML(product) {
    const mainElement = document.querySelector('.products');

    const parentWrap = document.createElement('div');
    parentWrap.classList.add('product-card');
    mainElement.appendChild(parentWrap);

    const imageProduct = new Image();
    imageProduct.src = product.imagePath;
    imageProduct.alt = product.alt;
    parentWrap.appendChild(imageProduct);

    const titleProduct = document.createElement('h3');
    titleProduct.classList.add('product-card__title');
    titleProduct.textContent = product.name;
    parentWrap.appendChild(titleProduct);

    const priceProduct = document.createElement('p');
    priceProduct.classList.add('product-card__price');
    priceProduct.textContent = product.price;
    parentWrap.appendChild(priceProduct);

    const buttonBuy = document.createElement('button');
    buttonBuy.classList.add('product-card__btn');
    buttonBuy.textContent = 'Купить';
    parentWrap.appendChild(buttonBuy);
  }
};

products.getProducts();
products.showProducts();