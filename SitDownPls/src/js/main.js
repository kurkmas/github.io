import Choices from 'choices.js';
import Swiper from 'swiper/bundle';
import noUiSlider from 'nouislider';

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const choices = new Choices('[data-trigger]', {
    searchEnabled: false,
    itemSelectText: ''
  });

  const selectchoices = new Choices('#bottom_header_select', {
    searchEnabled: false,
    itemSelectText: ''
  });

  const swiperPromo = new Swiper('.promo__swiper.swiper-container', {
    direction: 'horizontal',
    slidesPerGroup: 1,
    slidesPerColumn: 1,
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },

    autoplay: {
      delay: 3000,
    }
  });

  const offersSwiper = new Swiper('.offer_cards__field.swiper-container', {
    direction: 'horizontal',
    slidesPerGroup: 3,
    slidesPerColumn: 1,
    slidesPerView: 'auto',
    spaceBetween: 32,

    navigation: {
      nextEl: '.offer__button_next',
      prevEl: '.offer__button_prev',
    },
  });

  const usefulSwiper = new Swiper('.useful__swiper.swiper-container', {
    direction: 'horizontal',
    slidesPerGroup: 2,
    slidesPerColumn: 1,
    slidesPerView: 'auto',
    spaceBetween: 32,

    navigation: {
      nextEl: '.useful__button_next',
      prevEl: '.useful__button_prev',
    },
  });

  const catalogSwiper = new Swiper('.swiper-container.catalog_products__field', {
    direction: 'horizontal',
    slidesPerGroup: 3,
    slidesPerColumnFill: 'row',
    slidesPerColumn: 3,
    slidesPerView: 3,
    spaceBetween: 32,

    pagination: {
      el: '.catalog_pagination.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  const productSwiper = new Swiper('.product__swiper.swiper-container', {
    direction: 'horizontal',
    slidesPerGroup: 2,
    slidesPerColumn: 1,
    slidesPerView: 'auto',
    spaceBetween: 32,

    navigation: {
      nextEl: '.product__button_next',
      prevEl: '.product__button_prev',
    },
  });

  const rangeSlider = document.querySelector('.fiter__range');
  const rangeInputs = document.querySelectorAll('.input_number');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [2000, 250000],
      connect: true,
      step: 25000,
      keyboardSupport: true,
      range: {
        'min': [2000],
        'max': [250000]
      }
    });

    rangeSlider.noUiSlider.on('update', (values, handle) => {
      rangeInputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (index, value) => {
      let arr = [null, null];
      arr[index] = value;

      rangeSlider.noUiSlider.set(arr);
    };

    rangeInputs.forEach((item, i) => {
      item.addEventListener('change', (e) => {
        setRangeSlider(i, e.currentTarget.value);
      });
    });
  }

  const handles = document.querySelectorAll('.noUi-handle');
  const noUiLine = document.querySelector('.noUi-connect');

  handles.forEach((el) => {
    el.addEventListener('focus', () => {

      noUiLine.style.background = '#7033ac';
    });
  });

  handles.forEach((el) => {
    el.addEventListener('blur', () => {

      noUiLine.style.background = '#a65cf0';
    });
  });

  const productBtn = document.querySelector('.product__btn');
  const modalField = document.querySelector('.modal__field');
  const body = document.querySelector('body');
  const modalCloseBtn = document.querySelector('.modal__close_btn svg');

  if (productBtn) {
    productBtn.addEventListener('click', () => {
      modalField.classList.add('active');
      body.style.overflowY = 'hidden';
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalField.classList.remove('active');
      body.style.overflowY = 'auto';
    });
  }

  if (modalField) {
    modalField.addEventListener('click', (e) => {
      if (e.target == modalField) {
        modalField.classList.remove('active');
        body.style.overflowY = 'auto';
      }
    });
  }

  const map = document.getElementById('map');

  if (map) {
    ymaps.ready(init);
    function init() {
      const myMap = new ymaps.Map("map", {
        center: [55.75, 37.62],
        zoom: 16
      });

      const myPlacemark = new ymaps.Placemark([55.75, 37.64], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/svg/mapIcon.svg',
        iconImageSize: [32, 22],
        iconImageOffset: [-3, -42]
      });
      myMap.geoObjects.add(myPlacemark);
    }
  }

});
