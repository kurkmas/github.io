'use strict';

const burger = document.querySelector('.burger'),
  scale = document.querySelectorAll('.rating__line_orange'),
  percent = document.querySelectorAll('.rating__percent'),
  closeBtn = document.querySelector('.close__btn'),
  header = document.querySelector('.header');

burger.addEventListener('click', function () {
  burger.classList.add('burger_active');
  header.classList.add('header_active');
});

closeBtn.addEventListener('click', function () {
  burger.classList.remove('burger_active');
  header.classList.remove('header_active');
});

percent.forEach(function (item, i) {
  scale[i].style.width = item.innerHTML;
});
