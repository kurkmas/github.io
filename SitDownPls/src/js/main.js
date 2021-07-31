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
      el: ".catalog_pagination.swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  const rangeSlider = document.querySelector('.fiter__range');
  const rangeInputs = document.querySelectorAll('.input_number');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [2000, 250000],
      connect: true,
      step: 1,
      range: {
        'min': [2000],
        'max': [150000]
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
      item.addEventListener('update', (e) => {
        setRangeSlider(i, e.currentTarget.value);
      });
    });
  }
});
