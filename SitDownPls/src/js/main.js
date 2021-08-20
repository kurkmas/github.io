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
    slidesPerColumn: 1,
    slidesPerView: 'auto',
    spaceBetween: 32,

    navigation: {
      nextEl: '.offer__button_next',
      prevEl: '.offer__button_prev',
    },

    breakpoints: {
      320: {
        slidesPerGroup: 1
      },
      570: {
        slidesPerGroup: 2,
      },
      1025: {
        slidesPerGroup: 3,
      }
    }
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

    breakpoints: {
      320: {
        slidesPerGroup: 1
      },
      570: {
        slidesPerGroup: 2
      }
    }
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

  handles.forEach(el => {
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

  const burger = document.querySelector('.burger');
  const hederNav = document.querySelector('.header__nav');

  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      hederNav.classList.toggle('active');
    });
  }

  const filterGroup = document.querySelectorAll('.filters__title');
  const filterDropdown = document.querySelectorAll('.tablet_filter__inner');

  filterGroup.forEach((item, i) => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      filterDropdown[i].classList.toggle('active');
    });
  });

  const checkboxIinputs = document.querySelectorAll('.input_checkbox');
  const filterLabel = document.querySelectorAll('.filter__label');
  const filtersField = document.querySelectorAll('.tablet_filter__inner');
  const optionsField = document.querySelector('.catalog__options');

  class Option {
    constructor(selector, checkboxName, parentSelector) {
      this.selector = selector;
      this.checkboxName = checkboxName;
      this.parent = document.querySelector(parentSelector);
    }

    render() {
      const el = document.createElement('span');
      el.classList.add(this.selector);
      el.innerHTML =
        `${this.checkboxName}
          <button class="catalog__option_btn btn_reset">
            <svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M1.42872 0.238643L6.75487 5.42386C7.08171 5.74206 7.08171 6.25794 6.75487 6.57614L1.42872 11.7614C1.10188 12.0795 0.571969 12.0795 0.245129 11.7614C-0.0817098 11.4432 -0.0817098 10.9273 0.24513 10.6091L4.97949 6L0.24513 1.39091C-0.0817089 1.07272 -0.0817089 0.556834 0.24513 0.238643C0.57197 -0.0795478 1.10188 -0.0795477 1.42872 0.238643Z" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10.5713 0.238643L5.24513 5.42386C4.91829 5.74206 4.91829 6.25794 5.24513 6.57614L10.5713 11.7614C10.8981 12.0795 11.428 12.0795 11.7549 11.7614C12.0817 11.4432 12.0817 10.9273 11.7549 10.6091L7.02051 6L11.7549 1.39091C12.0817 1.07272 12.0817 0.556834 11.7549 0.238643C11.428 -0.0795478 10.8981 -0.0795477 10.5713 0.238643Z" />
            </svg>
          </button>`;
      this.parent.append(el);
    }
  }

  const uncheckedState = () => {
    filterLabel.forEach((item) => {
      item.addEventListener('click', () => {
        checkboxIinputs.forEach(item => {
          item.checked = false;
        });
      });
    });
  };

  filtersField.forEach(item => {
    item.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('input_checkbox')) {
        uncheckedState();
        target.checked = true;
        const currentCheckboxName = target.nextElementSibling.nextElementSibling.textContent;
        if (target.classList.contains('checkbox_category')) {
          new Option('lime_color', currentCheckboxName, '.catalog__options').render();
        } else if (target.classList.contains('checkbox_cost')) {
          new Option('bone_color', currentCheckboxName, '.catalog__options').render();
        } else if (target.classList.contains('checkbox_sale')) {
          new Option('pink_violet_color', currentCheckboxName, '.catalog__options').render();
        } else if (target.classList.contains('checkbox_color')) {
          new Option('md_grey', currentCheckboxName, '.catalog__options').render();
        }
      }
    });
  });

  optionsField.addEventListener('click', (e) => {
    const target = e.target.parentElement;
    if (target.classList.contains('catalog__option_btn')) {
      target.parentElement.remove();
    }
  });


  const map = document.getElementById('map');

  if (map) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
        center: [55.75, 37.62],
        zoom: 14,
      }, {
        searchControlProvider: 'yandex#search'
      }),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemarkWithContent = new ymaps.Placemark([55.752831393462664, 37.63848494650637], {
          balloonContent: `
          <div class="balloon">
          <h4>SitDownPls на Солянке </h4>
          <address>м. Китай-город, ул. Солянка, д.24</address>
          <a href="tel:+74958854547" class="tel_number">
            <svg width="100%" height="100%" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.3425 12.0983C15.215 12.0983 14.1242 11.915 13.1067 11.585C12.7858 11.475 12.4283 11.5575 12.1808 11.805L10.7417 13.6108C8.1475 12.3733 5.71833 10.0358 4.42583 7.35L6.21333 5.82833C6.46083 5.57167 6.53417 5.21417 6.43333 4.89333C6.09417 3.87583 5.92 2.785 5.92 1.6575C5.92 1.1625 5.5075 0.75 5.0125 0.75H1.84083C1.34583 0.75 0.75 0.97 0.75 1.6575C0.75 10.1733 7.83583 17.25 16.3425 17.25C16.9933 17.25 17.25 16.6725 17.25 16.1683V13.0058C17.25 12.5108 16.8375 12.0983 16.3425 12.0983Z" />
            </svg>
            <span>+7 (495) 885-45-47</span>
          </a>
          <div class="worktime">
            <span class="grey_text">Часы работы:</span>
            с 10:00 до 21:00
          </div>
          <div class="balloon__descr">
            <span class="grey_text">Что здесь:</span>
            шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр
          </div>
        </div>
        `,
        },
          {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '../img/svg/mapIcon.svg',
            iconImageSize: [32, 22],
            iconImageOffset: [-20, 0],
            iconContentOffset: [0],
            iconContentLayout: MyIconContentLayout
          });

      const myPlacemark = new ymaps.Placemark([55.76147157505062, 37.65023838640963], {
        balloonContent: 'Второй баллун',
      },
        {
          iconLayout: 'default#imageWithContent',
          iconImageHref: '../img/svg/mapIcon.svg',
          iconImageSize: [32, 22],
          iconImageOffset: [-20, 0],
          iconContentOffset: [0],
          iconContentLayout: MyIconContentLayout
        });

      myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);
    });
  }
});
