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
  const deadline = '2021-05-16';

  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / 1000 * 60 * 60) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    // console.log(t);


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

  // console.log(getTimeRemaining(deadline));

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
    triggerBtn = document.querySelectorAll('.btn'),
    modalCloseBtn = document.querySelector('.modal__close');

  triggerBtn.forEach(element => {
    element.addEventListener('click', openModal);
  });

  function openModal() {
    modalWindow.classList.toggle('modal_active');
    document.querySelector('body').style.overflowY = 'hidden';
    // clearInterval(modalTimerId);
  }

  function closeModal() {
    modalWindow.classList.remove('modal_active');
    document.body.style.overflowY = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);

  modalWindow.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal_active')) {
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

});