window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabsWrapper = document.querySelector('.tabheader__items'),
    tabs = tabsWrapper.querySelectorAll('.tabheader__item'),
    tabContent = document.querySelectorAll('.tabcontent');

  function hideTabcontent() {
    tabContent.forEach(item => {
      item.classList.add('hide');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabcontent();
  showTabContent();

  tabsWrapper.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabcontent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer
  const deadline = '2022-05-16';

  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / 1000 * 60 * 60) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);


    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = document.querySelector('#days'),
      hours = document.querySelector('#hours'),
      minutes = document.querySelector('#minutes'),
      seconds = document.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      days.innerHTML = getZero(t.days);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

  // Modal
  const modalWindow = document.querySelector('.modal'),
    triggerBtn = document.querySelectorAll('.modal_trigger');

  triggerBtn.forEach(element => {
    element.addEventListener('click', openModal);
  });

  function openModal() {
    modalWindow.classList.add('modal_active');
    document.querySelector('body').style.overflowY = 'hidden';
  }

  function closeModal() {
    modalWindow.classList.remove('modal_active');
    document.body.style.overflowY = '';
  }

  modalWindow.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal_active') || e.target.getAttribute('data-close') == "") {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalWindow.classList.contains('modal_active')) {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  function MenuCard(src, alt, title, descr, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.parent = document.querySelector(parentSelector);
    this.classes = classes;
    this.render = function () {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(function (className) {
          element.classList.add(className);
        });
      }

      element.innerHTML = `
					<img src=${src} alt=${alt}>
					<h3 class="menu__item-subtitle">${title}</h3>
					<div class="menu__item-descr">${descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${price}</span> грн/день</div>
					</div>`;
      this.parent.append(element);
    };
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих	овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    '.menu .container'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"',
    'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container'
  ).render();


  // forms
  const forms = document.querySelectorAll('form');

  forms.forEach(function (item) {
    postData(item);
  });

  const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! Мы с вами скоро свяжемся',
    failure: 'Что-то пошло не так...'
  };

  function postData(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);

      const obj = {};
      formData.forEach(function (value, key) {
        obj[key] = value;
      });

      const json = JSON.stringify(obj);

      request.send(json);

      request.addEventListener('load', function () {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success);
          statusMessage.remove();
          form.reset();
        } else {
          showThanksModal(message.failure);
        }
      });
    });
  }

  function showThanksModal(message) {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
          <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      modalDialog.classList.remove('hide');
      closeModal();
    }, 5000);
  }
});
