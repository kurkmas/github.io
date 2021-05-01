'use strict';

const personalMovieDb = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
  start: function () {
    personalMovieDb.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
    while (personalMovieDb.count == '' || personalMovieDb.count == null || isNaN(personalMovieDb.count)) {
      personalMovieDb.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
  },
  rememberMyFilms: function () {
    if (personalMovieDb.count <= 10) {
      console.log('Маловато фильмов!');

    } else if (personalMovieDb.count <= 30) {
      console.log('Классический зритель.');
    } else if (personalMovieDb.count >= 30) {
      console.log('Вы киноман!');
    } else {
      console.log('Error!');
    }
  },
  detectPersonalLevel: function () {
    let i = 0;
    while (i < 2) {
      const a = prompt('Один из последних просмотренных фильмов?', ''),
        b = prompt('Насколько вы оцените его?', '');
      i++;
      personalMovieDb.movies[a] = b;
    }
  },
  showMyDB: function (hidden) {
    if (!hidden) {
      console.log(personalMovieDb);
    }
  },
  writeYourGenres: function () {
    for (let i = 1; i <= 2; i++) {
      let genre = prompt(`Ваш любимый жанр под номером ${i}`);
      if (genre == '' || genre == null) {
        console.log('Вы ввели некорректные данные или не ввели вовсе');
        i--;
      } else {
        personalMovieDb.genres[i - 1] = genre;
      }
    }

    personalMovieDb.genres.forEach(function (item, i) {
      console.log(`Любимый жанр ${i + 1} - это ${item}`);
    });
  },
  toggleVisibleMyDB: function () {
    if (personalMovieDb.privat) {
      personalMovieDb.privat = false;
    } else {
      personalMovieDb.privat = true;
    }
  },
};

let x = 6;
alert(x++);