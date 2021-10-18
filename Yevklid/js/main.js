const burger = document.querySelector('#burger'),
  headerList = document.querySelector('.header__list');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  headerList.classList.toggle('active');
});

const accordionItem = document.querySelectorAll('.questions__list__item');
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

const mySwiper = new Swiper('.swiper', {
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 2000,
  }
});
