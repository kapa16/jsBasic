/*jslint node: true */
"use strict";

/**
 * Объект списка продуктов
 */
const products = {
  productsArray: [],

  /**
   * Получает товары "с сервера"
   */
  getProducts() {
    for (let i = 1; i <= 4; i++) {
      const product = {
        id: i,
        imagePath: `img/product${i}.jpg`,
        alt: `product${i}`,
        name: `Товар ${i}`,
        price: (i) * 1000,
      };

      this.productsArray.push(product);
    }
  },

  /**
   * Выводит товары на страницу
   */
  showProducts() {
    this.productsArray.forEach(product => this.createProductsCards(product))
  },

  /**
   * Создает элемент продукта на странице
   * @param {object} product - объект товара для вывода на страницу
   */
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

/**
 * объект корзины
 */
const basket = {
  productsBasket: [],
  currentProduct: {
    count: 0,
    sum: 0
  },
  countProducts: 0,
  sumProducts: 0,
  basketElement: document.querySelector('.basket'),
  basketInfoElement: document.querySelector('.basket__info'),
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
    this.showBasket();
  },

  /**
   * Увеличивает количество товара в корзине
   * @param {number} diff - разница для изменения количества товара
   */
  calcCountProduct(diff) {
    this.currentProduct.count += diff;
    this.currentProduct.sum = this.currentProduct.price * this.currentProduct.count;
  },

  /**
   * Добавляет новый товар в корзину
   * @param {object} product - товар
   */
  addNewProductInBasket(product) {
    this.currentProduct = Object.assign({}, product);
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
    return this.productsBasket.find(elem => elem.id === product.id);
  },

  /**
   * Отображает информацию по корзине
   */
  showBasket() {
    this.calcTotal();
    this.clearBasketOnPage();
    this.refreshBasketInfo();
    this.refreshCountProducts();
    this.productsBasket.forEach(product => this.addProductElement(product));
  },

  /**
   * Считает общее количество и сумму товаров в корзине
   */
  calcTotal() {
    this.countProducts = this.productsBasket.reduce((accum, element) => accum + element.count, 0);
    this.sumProducts = this.productsBasket.reduce((accum, element) => accum + element.sum, 0);
  },

  /**
   * Удаляет содержимое корзины в HTML для вывода текущих товаров корзины
   */
  clearBasketOnPage() {
    this.basketProductsElement.innerHTML = '';
  },

  /**
   * Обновляет инофрмационное сообщение по содержимому корзины
   */
  refreshBasketInfo() {
    if (this.countProducts === 0) {
      this.basketInfoElement.textContent = 'Корзина пуста';
    } else {
      this.basketInfoElement.textContent = `Количество товаров в корзине: ${this.countProducts}, на сумму ${this.sumProducts}`;
    }
  },

  /**
   * Обновляет счетчик товаров в корзине
   */
  refreshCountProducts() {
    const countElement = this.basketElement.querySelector('.basket__count-products');
    countElement.textContent = this.countProducts;
  },

  /**
   * Добавляет элемент продукта в корзину
   * @param {object} product - объект товара для вывода на страницу
   */
  addProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('basket__product');
    productElement.dataset.productId = product.id;
    this.basketProductsElement.appendChild(productElement);

    const productImage = new Image(40, 45);
    productImage.src = product.imagePath;
    productElement.appendChild(productImage);

    const productName = document.createElement('h5');
    productName.textContent = product.name;
    productName.classList.add('basket__product-name');
    productElement.appendChild(productName);

    const productSum = document.createElement('div');
    productSum.textContent = `${product.count} x ${product.price} = ${product.sum}`;
    productSum.classList.add('basket__product-sum');
    productElement.appendChild(productSum);

    const removeButton = document.createElement('div');
    removeButton.classList.add('basket__product-remove');
    removeButton.addEventListener('click', event => this.removeProduct(event));
    productElement.appendChild(removeButton);
  },

  /**
   * Удаляет товар из корзины
   * @param {Event} event - событие нажатия на кнопку
   */
  removeProduct(event) {
    const productId = +event.target.parentElement.dataset.productId;
    for (let i = 0; i < this.productsBasket.length; i++) {
      if (this.productsBasket[i].id === productId) {
        this.productsBasket.splice(i, 1);
        break;
      }
    }
    this.showBasket();
  }
};


products.getProducts();
products.showProducts();

basket.basketElement.addEventListener('click', event => showBasket(event));

function showBasket(event) {
  if (!event.target.classList.contains('basket')) {
    return;
  }
  if (basket.countProducts !== 0) {
    basket.basketProductsElement.classList.toggle('hidden');
  }
}

/**
 * Обработчик добавления товаров по кнопке Купить
 * @param {Event} event - событие нажатия на кнопку
 */
function basketHandler(event) {
  const handlerElement = event.target;
  if (handlerElement.tagName !== 'BUTTON') {
    return;
  }

  const productId = handlerElement.parentElement.dataset.productId;
  const product = products.getProductById(productId);

  basket.addProduct(product);
}