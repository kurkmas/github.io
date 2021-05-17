const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del('dist');
};

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist/resources'));
};

const styles = () => {
  return src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(autoprefixes({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images/svg'));
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

const imageCompress = () => {
  return src([
    'src/images/img/**/*.jpg',
    'src/images/img/**/*.png',
    'src/images/img/*.svg',
    'src/images/img/**/*.jpeg',
  ])
    .pipe(image())
    .pipe(dest('dist/images/img'));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
};

watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);


exports.scripts = scripts;
exports.clean = clean;
exports.default = series(clean, resources, htmlMinify, styles, svgSprites, imageCompress, scripts, watchFiles);

const copyFonts = () => {
  return src([
    'src/styles/fonts/**/*.woff2',
    'src/styles/fonts/**/*.woff'
  ])

    .pipe(dest('build/styles/fonts'));
};

const buildhtmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('build'));
};

const stylesBuild = () => {
  return src('src/styles/**/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('build/styles'));
};

const scriptsBuild = () => {
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

const resourcesBuild = () => {
  return src('src/resources/**')
    .pipe(dest('build/resources'));
};

const buildImages = () => {
  return src([
    'dist/images/img/**/*.jpg',
    'dist/images/img/**/*.png',
    'dist/images/img/*.svg',
    'dist/images/img/**/*.jpeg',
  ])
    .pipe(dest('build/images'));
};

const buildSvg = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('build/images/svg'));
};

exports.build = series(copyFonts, buildhtmlMinify, stylesBuild, scriptsBuild, resourcesBuild, buildSvg, buildImages);
