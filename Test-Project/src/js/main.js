import noUiSlider from 'nouislider';

const slider = document.getElementById('range-slider');
const rangeInput = document.getElementById('slider-input');
const headerBtn = document.querySelector('.header-price__btn');
const header = document.querySelector('.header');
const headerPopup = document.querySelector('.header-popup');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__close');
const modalForm = document.getElementById('modal-form');
const modalInputName = document.getElementById('modal-name');
const modalInputTel = document.getElementById('modal-tel');
const consultInputName = document.querySelector('.consult-name-js');
const consultInputTel = document.querySelector('.consult-tel-js');
const consultForm = document.querySelector('.consult-form-js');

noUiSlider.create(slider, {
  start: 0,
  connect: [false, false],
  step: 1,
  pips: {mode: 'count', values: 5},
  range: {
    'min': 0,
    'max': 80
  }
});

const pips = slider.querySelectorAll('.noUi-value');

function clickOnPip() {
    const value = Number(this.getAttribute('data-value'));
    slider.noUiSlider.set(value);
}

for (var i = 0; i < pips.length; i++) {

    pips[i].style.cursor = 'pointer';
    pips[i].addEventListener('click', clickOnPip);
}

slider.noUiSlider.on('update', (value) => {
  rangeInput.value = Math.round(value);
});

const setRangeSlider = (value) => {
  slider.noUiSlider.set(value);
};

  rangeInput.addEventListener('input', (e) => {
    setRangeSlider(rangeInput.value);
});

headerBtn.addEventListener('click', () => {
  header.classList.toggle('popup-open');
  headerPopup.classList.toggle('popup-open');
});

function openModal() {
  modal.classList.add('modal-open');
  document.body.style = 'overflow-y: hidden; padding-right: 17px;';
}

function closeModal() {
  modal.classList.remove('modal-open');
  document.body.style = 'overflow-y: scroll; padding-right: 0;';
}

modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-open')) {
    closeModal();
  }
});

modalCloseBtn.addEventListener('click', ()=> {
  closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modal.classList.contains('modal-open')) {
    closeModal();
  }
});

function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
  }
}

window.addEventListener('scroll', showModalByScroll);


function getFormInfo(form, nameSelector, telSelector){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let user = {};

    user.name = nameSelector.value;
    user.tel = telSelector.value;
    form.reset();

    if(form.classList.contains('modal__form')) {
    closeModal();
    }
    console.log(user);
  });

}

getFormInfo(modalForm, modalInputName, modalInputTel);
getFormInfo(consultForm, consultInputName, consultInputTel);
