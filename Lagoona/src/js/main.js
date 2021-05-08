'use strict';
window.addEventListener('DOMContentLoaded', function () {
  const burgerBtn = document.querySelector('.burger');
  const nav = document.querySelector('.header_nav');
  const cabinetBtn = document.querySelector('.personal_cabinet');
  const modalWindow = document.querySelector('.modal_wrapper');
  const body = document.querySelector('body');
  const modalCloseBtn = document.querySelector('.close_btn');

  burgerBtn.addEventListener('click', function () {
    this.classList.toggle('burger_active');
    nav.classList.toggle('header_nav_active');
  });

  cabinetBtn.addEventListener('click', function () {
    body.classList.add('stop_scroll');
    modalWindow.classList.add('modal_wrapper_active');
  });

  modalCloseBtn.addEventListener('click', function () {
    body.classList.remove('stop_scroll');
    modalWindow.classList.remove('modal_wrapper_active');
  });
});
