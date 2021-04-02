$(document).ready(function () {
  $('.burger').on('click', function () {
    $('.nav-list').addClass('nav-list--active');
  });

  $('.close').on('click', function () {
    $('.nav-list').removeClass('nav-list--active');
  });
});
