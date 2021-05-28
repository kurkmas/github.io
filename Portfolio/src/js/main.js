'use strict';

const burger = document.querySelector('.burger'),
  scale = document.querySelectorAll('.rating__line_orange'),
  percent = document.querySelectorAll('.rating__percent');

burger.addEventListener('click', function () {
  burger.classList.toggle('burger_active');
});

percent.forEach(function (item, i) {
  scale[i].style.width = item.innerHTML;
});
