const images = () => {
  const imgPopup = document.createElement('div'),
    workSection = document.querySelector('.works'),
    bigImage = document.createElement('img');

  imgPopup.classList.add('popup');
  workSection.appendChild(imgPopup);
  let imgscrollWidth = window.innerWidth - document.body.clientWidth + 'px';

  imgPopup.style.cssText = `
    display: none;
    justify-content: center;
    align-items: center;
  `;

  bigImage.style.cssText = `
    width: 50%;
    height: 90%;
    object-fit: cover;
  `;

  imgPopup.appendChild(bigImage);

  workSection.addEventListener('click', (e) => {
    e.preventDefault();

    let target = e.target;

    if (target && target.classList.contains('preview')) {
      imgPopup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = imgscrollWidth;
      const path = target.parentNode.getAttribute('href');
      bigImage.setAttribute('src', path);
    }

    if (target && target.matches('div.popup')) {
      imgPopup.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.paddingRight = 0;
    }
  });
};

export default images;
