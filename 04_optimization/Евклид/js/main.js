document.querySelector('#burger').addEventListener('click', function () {
  document.querySelector('#mobile__menu').classList.toggle('is__active');
});

document.querySelector('#burger').addEventListener('click', function () {
  document.querySelector('.menu__icon').classList.toggle('active');
});

var accordionItem = document.querySelectorAll('.questions__list__item');
accordionItem.forEach(function (item) {
  item.addEventListener('click', function () {
    this.nextElementSibling.classList.toggle('show');
  });
});

accordionItem.forEach(function (item) {
  item.addEventListener('click', function () {
    item.lastChild.previousSibling.classList.toggle('questions__icon-active');
  });
});




var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 2000,
  }
});

document.querySelectorAll('.step').forEach(function (item) {
  item.addEventListener('click', function (event) {
    var step = event.currentTarget.dataset.step;
    event.preventDefault();

    document.querySelectorAll('.consultation__box').forEach(function (item) {
      item.classList.remove('consultation__box--active');
    });
    document.querySelector(`[data-box="${step}"]`).classList.add('consultation__box--active');
  });
});
