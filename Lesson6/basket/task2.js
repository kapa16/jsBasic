/*jslint node: true */
"use strict";

const products = {
  productsArray: [],

  getProducts() {
    for (let i = 0; i < 4; i++) {
      const product = {
        id: i,
        imagePath: `img/product${i + 1}.jpg`,
        alt: `product${i + 1}`,
        name: `Товар ${i + 1}`,
        price: (i + 1) * 1000,
      };

      this.productsArray.push(product);
    }
  },

  showProducts() {
    this.productsArray.forEach(product => this.createProductsCards(product))
  },

  createProductsCards(product) {
    const mainElement = document.querySelector('.products');

    const parentWrap = document.createElement('div');
    parentWrap.classList.add('product-card');
    parentWrap.dataset.productId = product.id;
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
    buttonBuy.addEventListener('click', event => basketHandler(event))
  },

  getProductById(productId) {
    return this.productsArray.find(element => element.id === +productId);
  }
};

const basket = {
  productsBasket: [],
  currentProduct: {
    count: 0,
    sum: 0
  },
  countProducts: 0,
  sumProducts: 0,
  basketElement: document.querySelector('.basket'),
  basketProductsElement: document.querySelector('.basket__products'),

  /**
   * Добавляет товар в корзину
   * @param {object} product - товар
   */
  addProduct(product) {
    this.currentProduct = this.findProductInBasket(product);
    if (!this.currentProduct) {
      this.addNewProductInBasket(product);
    } else {
      this.calcCountProduct(1);
    }
    this.createBasketElements();
  },

  /**
   * Увеличивает количество товара в корзине
   * @param {number} diff - разница для изменения количества товара
   */
  calcCountProduct(diff) {
    this.currentProduct.count += diff;
    this.currentProduct.sum += this.currentProduct.price * this.currentProduct.count;
  },

  /**
   * Добавляет новый товар в корзину
   * @param {object} product - товар
   */
  addNewProductInBasket(product) {
    this.currentProduct = Object.assign({}, product)
    this.currentProduct.count = 0;
    this.currentProduct.sum = 0;
    this.calcCountProduct(1);
    this.productsBasket.push(this.currentProduct);
  },

  /**
   * Проверяет наличие товара в корзине
   * @param {object} product - товар
   * @returns {object} - найденный товар
   */
  findProductInBasket(product) {
    return this.productsBasket.find(elem => elem.id = product.id);
  },

  /**
   * Создает элементы корзины на странице
   */
  createBasketElements() {
    this.clearBasketOnPage();
    const countElement = this.basketElement.querySelector('.basket__count-goods');
    countElement.textContent = this.productsBasket.reduce((accum, element) => accum + element.count);
    console.dir(countElement.textContent);
  },

  clearBasketOnPage() {
    this.basketProductsElement.innerHTML = '';
  }
};


products.getProducts();
products.showProducts();

function basketHandler(event) {
  const handlerElement = event.target;
  if (handlerElement.tagName != 'BUTTON') {
    return;
  }

  const productId = handlerElement.parentElement.dataset.productId;
  const product = products.getProductById(productId);

  basket.addProduct(product);
}