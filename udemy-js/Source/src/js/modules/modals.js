const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeBtnSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      closeBtn = document.querySelector(closeBtnSelector),
      modalWindows = document.querySelectorAll('[data-modal]');

    const closeModalWindows = () => {
      modalWindows.forEach(item => {
        item.style.display = 'none';
      });
    };

    trigger.forEach(element => {
      element.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        closeModalWindows();

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn.addEventListener('click', () => {
      closeModalWindows();
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModalWindows();
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = '';
    }, time);
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal('.popup_calc_button', '.popup_calc_profile',
    '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end',
    '.popup_calc_end_close', false);
  // showModalByTime('.popup', 2000);
};

export default modals;
