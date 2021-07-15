const { src, dest, series, watch } = require('gulp'),
  concat = require('gulp-concat'),
  htmlMin = require('gulp-htmlmin'),
  cleanCSS = require('gulp-clean-css'),
  imageMin = require('gulp-imagemin'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify-es').default,
  del = require('del'),
  webpImage = require('gulp-webp'),
  sourcemaps = require('gulp-sourcemaps'),
  notify = require('gulp-notify'),
  browserSync = require('browser-sync').create();

const clean = () => {
  return del('dist');
};

const styles = () => {
  return src('src/css/style.min.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream());
};

const copyFonts = () => {
  return src([
    'src/fonts/**/*.woff2',
    'src/fonts/**/*.woff'
  ])

    .pipe(dest('dist/styles/fonts'));
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const imgCompress = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/*.svg',
    'src/img/**/*.jpeg'
  ])
    .pipe(imageMin())
    .pipe(dest('dist/img'));
};

const imageTransform = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg'
  ])
    .pipe(webpImage())
    .pipe(dest('dist/img/webp'));
};

const faviconFiles = () => {
  return src([
    'src/img/favicon/**/*.xml',
    'src/img/favicon/**/*.ico',
    'src/img/favicon/**/*.json'
  ])

    .pipe(dest('dist/img/favicon'));
};

const copySvg = () => {
  return src('src/img/svg/*.svg')
    .pipe(dest('dist/img/svg'));
};

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
};


watch('src/**/*.html', htmlMinify);
watch('src/css/**/*.css', styles);
watch('src/js/**/*.js', scripts);


exports.default = series(clean, copyFonts, htmlMinify, styles, imgCompress,
  imageTransform, faviconFiles, copySvg, scripts, watchFiles);


const buildClean = () => {
  return del('build');
};

const buildCopyFonts = () => {
  return src([
    'src/fonts/**/*.woff2',
    'src/fonts/**/*.woff'
  ])

    .pipe(dest('build/styles/fonts'));
};

const builHhtmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest('build'));
};

const buildStyles = () => {
  return src('src/css/style.min.css')
    .pipe(dest('build/styles'));
};

const buildImgCompress = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/*.svg',
    'src/img/**/*.jpeg'
  ])
    .pipe(imageMin())
    .pipe(dest('build/img'));
};

const buildImageTransform = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg'
  ])
    .pipe(webpImage())
    .pipe(dest('build/img/webp'));
};

const buildFaviconFiles = () => {
  return src([
    'src/img/favicon/**/*.xml',
    'src/img/favicon/**/*.ico',
    'src/img/favicon/**/*.json'
  ])

    .pipe(dest('build/img/favicon'));
};

const buildCopySvg = () => {
  return src('src/img/svg/*.svg')
    .pipe(dest('build/img/svg'));
};

const buildScripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('build/js'));
};

exports.build = series(buildClean, builHhtmlMinify, buildCopyFonts, buildStyles, buildImgCompress, buildImageTransform, buildFaviconFiles, buildCopySvg, buildScripts);
