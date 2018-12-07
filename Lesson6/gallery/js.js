"use strict";

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 * @property {string} settings.errorOpenedImageBtnSrc Путь до картинки ошибки загрузки открытой картинки.
 * @property {string} settings.openedImageArrowsClass Класс кнопок пролистывания картинок
 * @property {string} settings.openedImageArrowPrevClass Класс кнопки предыдущей картинки
 * @property {string} settings.openedImageArrowNextClass Класс кнопки следующей картинки
 */
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
    errorOpenedImageBtnSrc: 'images/gallery/noImage.jpg',
    openedImageArrowsClass: 'galleryWrapper__arrow',
    openedImageArrowPrevClass: 'galleryWrapper__arrow_prev',
    openedImageArrowNextClass: 'galleryWrapper__arrow_next',

  },
  directionPrev: 'previous',
  directionNext: 'next',
  currentFullImageUrl: '',

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} userSettings Объект настроек для галереи.
   */
  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, userSettings);

    // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
    // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
    // gallery и передадим туда событие MouseEvent, которое случилось.
    document
      .querySelector(this.settings.previewSelector)
      .addEventListener('click', event => this.containerClickHandler(event));
  },

  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клики мышью.
   * @param {HTMLElement} event.target Целевой объект, куда был произведен клик.
   */
  containerClickHandler(event) {
    // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
    if (event.target.tagName !== 'IMG') {
      return;
    }
    // Открываем картинку с полученным из целевого тега (data-full_image_url аттрибут).
    this.openImage(event.target.dataset.full_image_url);
  },


  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
    const imageElement = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`);
    imageElement.src = src;
    this.changeCurrentUrl(src);
    this.errorLoadImageHandler(imageElement);
  },

  changeCurrentUrl(currentUrl) {
    this.currentFullImageUrl = currentUrl;
  },

  /**
   * Обрабатывает ошибку загрузки картинки
   * @param {HTMLImageElement} imageElement - элемент картинки
   */
  errorLoadImageHandler(imageElement){
    imageElement.onerror = () => imageElement.src = this.settings.errorOpenedImageBtnSrc;
  },

  /**
   * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
   * @returns {Element}
   */
  getScreenContainer() {
    // Получаем контейнер для открытой картинки.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // Если контейнер для открытой картинки существует - возвращаем его.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // Возвращаем полученный из метода createScreenContainer контейнер.
    return this.createScreenContainer();
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {HTMLElement}
   */
  createScreenContainer() {
    // Создаем сам контейнер-обертку и ставим ему класс.
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener('click', () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);

    const arrowPrev = document.createElement('div');
    arrowPrev.classList.add(this.settings.openedImageArrowsClass, this.settings.openedImageArrowPrevClass);
    arrowPrev.textContent = '<';
    arrowPrev.addEventListener('click', event => this.arrowsClickHandler(event));
    galleryWrapperElement.appendChild(arrowPrev);

    const arrowNext = document.createElement('div');
    arrowNext.classList.add(this.settings.openedImageArrowsClass, this.settings.openedImageArrowNextClass);
    arrowNext.textContent = '>';
    arrowNext.addEventListener('click', event => this.arrowsClickHandler(event));
    galleryWrapperElement.appendChild(arrowNext);

    // Добавляем контейнер-обертку в тег body.
    document.body.appendChild(galleryWrapperElement);

    // Возвращаем добавленный в body элемент, наш контейнер-обертку.
    return galleryWrapperElement;
  },


  arrowsClickHandler(event) {

    const direction = this.determineDirection(event);
    const src = this.getReplacementImageSrc(direction);

    this.openImage(src);
  },

  /**
   * Определяет направление пролистывания изображений
   * @param {Event} event - событие по кнопке смены изображения
   * @returns {string} - направление смены изображений
   */
  determineDirection(event) {
    return (event.target.classList.contains(this.settings.openedImageArrowPrevClass)) ?
      this.directionPrev : this.directionNext;

  },

  getReplacementImageSrc(direction) {
    const galleryContainer = document.querySelector(this.settings.previewSelector);
    const imagePreviewElement = galleryContainer.
      querySelector(`[data-full_image_url="${this.currentFullImageUrl}"]`);
    const nextImagePreviewElement = imagePreviewElement[`${direction}ElementSibling`];
    if (nextImagePreviewElement) {
      return nextImagePreviewElement.dataset.full_image_url;
    }
    if (direction === 'next') {
      return galleryContainer.firstElementChild.dataset.full_image_url;
    } else {
      return galleryContainer.lastElementChild.dataset.full_image_url;
    }
  },

  /**
   * Закрывает (удаляет) контейнер для открытой картинки.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});