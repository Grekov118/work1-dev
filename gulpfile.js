const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const notify = require('gulp-notify');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const del = require('del');
const addSrc = require('gulp-add-src');
const replace = require('gulp-replace');

const styles = () => {
  return src([
      // 'node_modules/slick-carousel/slick/slick.scss',
      // 'node_modules/swiper/swiper.scss',
      'app/scss/**/*.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      cascade: false,
      grid: true
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    // .pipe(addSrc([
    //   // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
    //   // 'node_modules/ion-rangeslider/css/ion.rangeSlider.min.css',
    //   // 'node_modules/magnific-popup/dist/magnific-popup.css',
    //   'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
    //   // 'node_modules/rateyo/src/jquery.rateyo.css',
    //   // 'node_moduless/swipers/swiper-bundle.css',
    // ]))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(replace('url(../../images/', 'url(../images/'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

const scripts = () => {
  return src([
      // 'node_modules/jquery/dist/jquery.min.js',
      
      // 'node_modules/slick-carousel/slick/slick.js',
      // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
      // 'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
      'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
      'node_modules/wowjs/dist/wow.min.js',
      // 'node_modules/just-validate/dist/js/just-validate.min.js',

      // 'node_modules/inputmask/dist/inputmask.min.js',
      // 'node_modules/mixitup/dist/mixitup.js',
      // 'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
      // 'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
      // 'node_modules/rateyo/src/jquery.rateyo.js',
      // 'node_modules/swiper/swiper-bundle.min.js',
      'app/js/main.js',
    ])
    .pipe(terser())
    .pipe(concat('main.min.js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const htmlInclude = () => {
  return src(['app/index.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(replace('url(../../images/', 'url(../images/'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const imgToDist = () => {
  return src(['app/images/**/*.jpg', 'app/images/**/*.png', 'app/images/**/*.jpeg', 'app/images/**/*.ico'])
    .pipe(dest('dist/images'))
}

const videoToDist = () => {
  return src(['app/video/**/*.mp4'])
    .pipe(dest('dist/video'))
}

const svgSprites = () => {
  return src('app/images/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images'))
}

const fonts = () => {
  return src('app/fonts/**/*') // Укажите правильный путь к вашим шрифтам
    .pipe(dest('dist/fonts'))
}

const clean = () => {
  return del(['dist/*'])
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    notify: false,
    online: true,
  });

  watch('app/scss/**/*.scss', styles);
  watch('app/**/*.html', htmlInclude);
  watch('app/images/**/*.jpg', imgToDist);
  watch('app/images/**/*.png', imgToDist);
  watch('app/images/**/*.jpeg', imgToDist);
  watch('app/images/**/*.ico', imgToDist);
  watch('app/images/**/*.svg', svgSprites);
  watch('app/video/**/*.mp4', videoToDist);
  watch(['app/js/**/*.js', '!app/js/.main.min.js'], scripts);
}

exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.fileinclude = htmlInclude;
exports.watchFiles = watchFiles;

exports.default = series(clean, parallel(htmlInclude, scripts, imgToDist, videoToDist, svgSprites, fonts), styles, watchFiles);

const scriptsBuild = () => {
  return src([
      // 'node_modules/jquery/dist/jquery.min.js',
      // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
      // 'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
      'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
      'node_modules/wowjs/dist/wow.min.js',
      'app/js/main.js',
    ])
    .pipe(terser())
    .pipe(concat('main.min.js'))
    .pipe(dest('dist/js'))
}

const stylesBuild = () => {
  return src([
      'app/scss/**/*.scss'
    ])
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      cascade: false,
      grid: true
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(replace('url(../../images/', 'url(../images/'))
    .pipe(dest('dist/css/'))
}

exports.build = series(clean, parallel(htmlInclude, scriptsBuild, imgToDist, svgSprites, videoToDist, fonts), stylesBuild);