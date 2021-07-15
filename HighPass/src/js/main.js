'use strict';

window.addEventListener('DOMContentLoaded', function () {
  const projectBtns = document.querySelectorAll('.btns__wrapper button');

  function removeActiveClass() {
    projectBtns.forEach(function (item) {
      item.classList.remove('projects__btn_active');
    });
  }

  projectBtns.forEach(function (item) {
    item.addEventListener('click', function () {

      const btnNumber = this.innerText;
      if (btnNumber == '1') {
        removeActiveClass();
        this.classList.add('projects__btn_active');
        document.querySelector('.projects_content_left').classList.remove('projects_content_hidden');
        document.querySelector('.projects_content_right').classList.remove('projects_content_right_active');
      }

      if (btnNumber == '2') {
        removeActiveClass();
        this.classList.add('projects__btn_active');
        document.querySelector('.projects_content_left').classList.add('projects_content_hidden');
        document.querySelector('.projects_content_right').classList.add('projects_content_right_active');
      }
    });
  });

  const serviceButtonsField = document.querySelector('.service_types__field');

  serviceButtonsField.addEventListener('click', function (e) {
    const target = e.target;

    if (target == document.querySelector('.service__right_btn')) {
      document.querySelector('.service__main_list').classList.add('service__main_list_hidden');
      document.querySelector('.retouch_list').classList.add('retouch_list_active');
      document.querySelector('.service__left_btn').classList.remove('colored');
      document.querySelector('.service__right_btn').classList.add('colored');
      document.querySelector('.service__works_list').classList.add('hide');
      document.querySelector('.retouch__works_list').classList.add('show');
    } else if (target == document.querySelector('.service__left_btn')) {
      document.querySelector('.service__main_list').classList.remove('service__main_list_hidden');
      document.querySelector('.retouch_list').classList.remove('retouch_list_active');
      document.querySelector('.service__right_btn').classList.remove('colored');
      document.querySelector('.service__left_btn').classList.add('colored');
      document.querySelector('.service__works_list').classList.remove('hide');
      document.querySelector('.retouch__works_list').classList.remove('show');
    }
  });

  const mapAddresBtn = document.querySelector('.map__close_btn');

  mapAddresBtn.addEventListener('click', function () {
    document.querySelector('.map__address').classList.add('hide');
  });

  const headerSearchBtn = document.querySelector('.tablet_serch__btn');
  const headerForm = document.querySelector('.header__top__inner .header__form');
  const headerFormClose = document.querySelector('.header__form__close');

  headerSearchBtn.addEventListener('click', function () {
    headerForm.classList.add('header__form_active');
  });

  headerFormClose.addEventListener('click', function () {
    headerForm.classList.remove('header__form_active');
  });

  const burgerBtn = document.querySelector('.burger');
  const navCloseBtn = document.querySelector('.nav__close_btn');
  const telLink = document.querySelector('.header__bottom__inner .tel__link');

  navCloseBtn.addEventListener('click', function () {
    document.querySelector('.header__bottom__nav').classList.remove('header__bottom__nav_active');
  });

  burgerBtn.addEventListener('click', function () {
    document.querySelector('.header__bottom__nav').classList.add('header__bottom__nav_active');
  });

  const modalWindow = document.querySelector('.modal');
  const modalCloseBtn = document.querySelector('.modal__close');
  const body = document.querySelector('body');

  function openModal() {
    modalWindow.classList.add('modal_active');
    body.style.overflowY = 'hidden';
  }

  function closeModal() {
    modalCloseBtn.addEventListener('click', function () {
      modalWindow.classList.remove('modal_active');
      body.style.overflowY = 'auto';
    });
  }
  closeModal();

  function ShowModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', ShowModalByScroll);
    }
  }

  window.addEventListener('scroll', ShowModalByScroll);

  const mailInput = document.querySelectorAll('.mail_input');
  function chekingString() {
    mailInput.forEach(element => {
      const alert = element.nextElementSibling;
      element.addEventListener('input', function () {
        if (element.value.match(/\W/g)) {
          alert.style.color = '#f06666';
        } else {
          alert.style.color = 'transparent';
        }
      });
    });
  }

  chekingString();

  function smothAppearance(selector) {
    const currentSelector = document.querySelector(selector);
    currentSelector.classList.add('active');
  }
  smothAppearance('.header');

  window.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= 50) {
      smothAppearance('.hero');
    }

    if (scrollTop >= 600) {
      smothAppearance('.studio');
    }

    if (scrollTop >= 1200) {
      smothAppearance('.projects');
    }

    if (scrollTop >= 1900) {
      smothAppearance('.service');
    }

    if (scrollTop >= 3000) {
      smothAppearance('.master');
    }

    if (scrollTop >= 3400) {
      smothAppearance('.contacts');
    }

    if (scrollTop >= 3700) {
      smothAppearance('.footer');
    }
  });


  ymaps.ready(init);
  function init() {
    const myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 13
    });

    const myPlacemark = new ymaps.Placemark([55.76, 37.63], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/svg/Ellipse.svg',
      iconImageSize: [12, 12],
      iconImageOffset: [-3, -42]
    });
    myMap.geoObjects.add(myPlacemark);
  }

});

