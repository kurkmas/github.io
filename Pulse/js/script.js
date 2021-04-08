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
    this.parentElement.parentElement.querySelector('.tabs__hidden').classList.add('tabs__hidden--active');
  });
});

tabsHiddenLink.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    this.parentElement.classList.remove('tabs__hidden--active');
  });
});
