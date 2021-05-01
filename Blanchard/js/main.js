var gallerySwiper = new Swiper('.gallery-swiper-container', {
  direction: 'horizontal',
  slidesPerGroup: 1,
  slidesPerColumn: 1,
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    455: {
      slidesPerGroup: 2,
      slidesPerColumn: 1,
      slidesPerView: 2,
      spaceBetween: 20,
    },

    760: {
      slidesPerGroup: 2,
      slidesPerColumn: 2,
      slidesPerView: 2,
      spaceBetween: 34
    },

    1321: {
      slidesPerGroup: 3,
      slidesPerColumn: 2,
      slidesPerView: 3,
      spaceBetween: 50
    }
  },



  navigation: {
    nextEl: '.gallery-button-next',
    prevEl: '.gallery-button-prev',
  },

  pagination: {
    el: '.gallery-pagination',
    type: 'fraction',
  },
});

document.addEventListener('DOMContentLoaded', function () {
  window.onresize = function () {
    gallerySwiper.update();
  }
});

var editionSwiper = new Swiper('.edition-swiper-container', {
  direction: 'horizontal',
  slidesPerGroup: 1,
  slidesPerView: 1,
  slidesPerColumn: 1,
  spaceBetween: 10,

  navigation: {
    nextEl: '.edition-button-next',
    prevEl: '.edition-button-prev',
  },

  pagination: {
    el: '.edition-pagination',
    type: 'fraction',
  },

  breakpoints: {
    455: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      slidesPerColumn: 1,
      spaceBetween: 34
    },

    1200: {
      slidesPerGroup: 1,
      slidesPerColumn: 1,
      slidesPerView: 2,
      spaceBetween: 50
    },

    1500: {
      slidesPerGroup: 1,
      slidesPerColumn: 1,
      slidesPerView: 3,
      spaceBetween: 50
    }
  }
});

var projectsSwiper = new Swiper('.projects-swiper-container', {
  direction: 'horizontal',
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerColumn: 1,
  spaceBetween: 10,

  navigation: {
    nextEl: '.pro-button-next',
    prevEl: '.pro-button-prev',
  },

  breakpoints: {
    580: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      slidesPerColumn: 1,
      spaceBetween: 34
    },

    1197: {
      slidesPerGroup: 3,
      slidesPerColumn: 1,
      slidesPerView: 3,
      spaceBetween: 50
    }
  }
});

var eventSwiper = new Swiper('.event-swiper-container', {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 10,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
});

var selector = document.querySelector('input[type="tel"]');
var im = new Inputmask('+7 (999) 999-99-99');

im.mask(selector);

new JustValidate('form', {
  tel: {
    required: true,
    function: (name, value) => {
      const phone = selector.inputmask.unmaskedvalue();
      return Number(phone) && phone.length == 10;
    }
  }
});

var element = document.querySelector('#select');
var choises = new Choices(element, {
  itemSelectText: '',
  searchEnabled: false
});

var burgerBtn = document.querySelector('.burger-menu');

burgerBtn.addEventListener('click', function () {
  document.querySelector('.burger-menu__nav').classList.toggle('menu__nav-active');
  document.querySelector('.burger-menu__icon').classList.toggle('icon-active');
  document.querySelector('.tablet-loupe__search').classList.toggle('tablet-loupe__search--hidden');
});


function showHiddenForm() {
  document.querySelector('.tablet-loupe__search').classList.add('search-active');
}

document.querySelector('.tablet-loupe').addEventListener('click', function (event) {
  event.currentTarget.classList.add('search-active');
  document.querySelector('.mobile-bg').classList.add('mobile-bg--active');
  showHiddenForm();
});

document.querySelector('.close').addEventListener('click', function () {
  document.querySelector('.tablet-loupe__search').classList.remove('search-active');
  document.querySelector('.tablet-loupe').classList.remove('search-active');
  document.querySelector('.mobile-bg').classList.remove('mobile-bg--active');
});

var styleLIst = document.querySelectorAll('.header__bottom__list__item');
styleLIst.forEach(function (item) {
  item.addEventListener('click', function (event) {
    item.querySelector('.hidden__list-wrapper').classList.toggle('hidden__list--active');
    item.querySelector('.header__bottom__list__item__svg').classList.toggle('list__item__svg--active');
  });
});

document.querySelectorAll('.header__bottom__list__item').forEach(function (item) {
  item.addEventListener('keydown', function (event) {
    var enter = event.code;
    if (enter == 'Enter') {
      item.querySelector('.hidden__list-wrapper').classList.toggle('hidden__list--active');
      item.querySelector('.header__bottom__list__item__svg').classList.toggle('list__item__svg--active');
    }
  });
});

document.querySelectorAll('.hidden__list-wrapper').forEach(function (item) {
  new SimpleBar(item);
});

document.querySelectorAll('.catalog-main__list__item__title').forEach(function (item) {
  item.addEventListener('click', function (event) {
    item.nextElementSibling.classList.toggle('inner-list__active');
    event.currentTarget.lastElementChild.classList.toggle('arrow-down--active');
    event.preventDefault();
  });
});

document.querySelectorAll('.inner-list__item').forEach(function (item) {
  item.addEventListener('click', function (event) {
    var artist = event.currentTarget.dataset.artist;

    document.querySelectorAll('.artist-container').forEach(function (item) {
      item.classList.remove('artist-container--active');
    });
    document.querySelector(`[data-target="${artist}"]`).classList.add('artist-container--active');
  });
});

document.querySelectorAll('.inner-list__artists').forEach(function (item) {
  item.addEventListener('click', function (event) {
    event.preventDefault();
  });
});

document.querySelectorAll('.catalog-lang-list__item').forEach(function (item) {
  item.addEventListener('click', function (event) {
    var country = event.currentTarget.dataset.country;

    document.querySelectorAll('.catalog-main').forEach(function (item) {
      item.classList.remove('catalog-main--active');
    });
    document.querySelector(`[data-container="${country}"]`).classList.add('catalog-main--active');
  });
});

document.querySelectorAll('.catalog-lang-list__item').forEach(function (item) {
  item.addEventListener('keydown', function (event) {
    var country = event.currentTarget.dataset.country;
    var enter = event.code;
    if (enter == 'Enter') {
      document.querySelectorAll('.catalog-main').forEach(function (item) {
        item.classList.remove('catalog-main--active');
      });
      document.querySelector(`[data-container="${country}"]`).classList.add('catalog-main--active');
    }
  });
});

function showHiddenCards() {
  document.querySelectorAll('.event-list__card').forEach(function (item) {
    item.classList.remove('hidden-card');
    item.classList.remove('hidden-tablet-card');
  });
}

function hideButton() {
  var eventBtn = document.querySelector('.event__btn');
  eventBtn.addEventListener('click', function () {
    eventBtn.style = 'display: none';
    showHiddenCards();
  });
}
hideButton();

document.querySelector('.categories__mobile-wrapper').addEventListener('click', function () {
  document.querySelector('.mobile-edition-form').classList.toggle('mobile-edition-form--active');
  document.querySelector('.categories__arrow').classList.toggle('categories__arrow--active');
});

ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    center: [55.75846306898368, 37.601079499999905],
    zoom: 12
  });

  var myPlacemark = new ymaps.Placemark([55.75846306898368, 37.601079499999905], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/mapmark.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-3, -42]
  });

  myMap.geoObjects.add(myPlacemark);
}
