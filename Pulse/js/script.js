'use strict';

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

const choiseTab = document.querySelectorAll('.choise');
const tabsLink = document.querySelectorAll('.tabs__link');
const tabsHiddenLink = document.querySelectorAll('.tabs__hidden-link');

function stopScrolling() {
  document.querySelector('body').classList.add('stop-scrolling');
}

function resumeScrolling() {
  document.querySelector('body').classList.remove('stop-scrolling');
}

choiseTab.forEach(function (item) {
  item.addEventListener('click', function (event) {
    let dataButton = event.currentTarget.dataset.button;
    choiseTab.forEach(function (item) {
      item.classList.remove('choise--active');
    });
    this.classList.add('choise--active');
    document.querySelectorAll('.tabs__list').forEach(function (item) {
      item.classList.remove('tabs__list--active');
      document.querySelector(`[data-tabs="${dataButton}"]`).classList.add('tabs__list--active');
    });
  });
});

tabsLink.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    this.parentElement.parentElement.parentElement.querySelector('.tabs__hidden').classList.add('tabs__hidden--active');
    this.parentElement.classList.add('tabs__item__wrapper-top--hidden');
  });
});

tabsHiddenLink.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    this.parentElement.classList.remove('tabs__hidden--active');
    this.parentElement.previousElementSibling.previousElementSibling.
      classList.remove('tabs__item__wrapper-top--hidden');
  });
});

let modalOpen = function () {
  document.querySelector('.modal').classList.add('modal--active');
  document.querySelectorAll('modal__inner_hidden').forEach(function (item) {
    item.classList.remove('modal__inner_shown');
  });
};

document.querySelectorAll('.modal__btn').forEach(function (item) {
  item.addEventListener('click', function (e) {
    let modalBtn = e.currentTarget.dataset.btn;
    modalOpen();
    stopScrolling();
    document.querySelector(`[data-target="${modalBtn}"]`).classList.add('modal__inner_shown');
  });
});

document.querySelectorAll('.tabs__btn').forEach(function (item) {
  item.addEventListener('click', function (e) {
    let productName = e.currentTarget.parentElement.previousElementSibling.
      querySelector('.tabs__title').textContent;
    if (e.currentTarget.classList.contains('tabs__btn')) {
      document.querySelector('.modal__product').textContent = `${productName}`;
    }
    modalOpen();
    stopScrolling();
  });
});

document.querySelectorAll('.btn-close').forEach(function (item) {
  item.addEventListener('click', function (e) {
    document.querySelector('.modal').classList.remove('modal--active');
    document.querySelectorAll('.modal__inner_hidden').forEach(function (item) {
      item.classList.remove('modal__inner_shown');
    });
    resumeScrolling();
  });
});
