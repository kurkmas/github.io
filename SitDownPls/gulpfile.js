const { src, dest, series, watch } = require('gulp'),
  concat = require('gulp-concat'),
  htmlMin = require('gulp-htmlmin'),
  cleanCSS = require('gulp-clean-css'),
  imageMin = require('gulp-imagemin'),
  imageminOptipng = require('imagemin-optipng'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify-es').default,
  webpack = require('webpack-stream'),
  del = require('del'),
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
    'src/img/images/**/*.jpg',
    'src/img/images/**/*.jpeg',
    'src/img/images/**/*.png'
  ])

    .pipe(imageMin([
      imageMin.mozjpeg({ quality: 75, progressive: true }),
      imageMin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(dest('dist/img/images'));
};

const faviconFiles = () => {
  return src([
    'src/favicon/**/*.png',
    'src/favicon/**/*.xml',
    'src/favicon/**/*.ico',
    'src/favicon/**/*.json'
  ])

    .pipe(dest('dist/favicon'));
};

const copySvg = () => {
  return src('src/img/svg/*.svg')
    .pipe(dest('dist/img/svg'));
};

const scripts = () => {
  return src([
    'src/js/main.js'
  ])
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'app.js'
      },
      watch: false,
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
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


exports.default = series(clean, copyFonts, htmlMinify, styles, imgCompress, faviconFiles, copySvg, scripts, watchFiles);
