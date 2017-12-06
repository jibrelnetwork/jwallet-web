var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');

var i18nEN = require('./landing/html/i18n/en');
var i18nKO = require('./landing/html/i18n/ko');

var vendorScripts = [
  './landing/js/vendor/TweenMax.min.js',
  './landing/js/vendor/jquery.min.js',
  './landing/js/vendor/aos.js',
  './landing/js/vendor/wavify.js',
  './landing/js/vendor/scroll.js',
]

var scripts = [
  './landing/js/main.js',
]

gulp.task('html-en', function() {
  return gulp
    .src('./landing/html/index.html')
    .pipe(nunjucks.compile(i18nEN))
    .pipe(rename('home-index.html'))
    .pipe(gulp.dest('./src/public/'));
});

gulp.task('html-ko', function() {
  return gulp
    .src('./landing/html/index.html')
    .pipe(nunjucks.compile(i18nKO))
    .pipe(rename('ko.html'))
    .pipe(gulp.dest('./src/public/'));
});

gulp.task('css', function() {
  return gulp
    .src('./landing/less/**/*.less')
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./src/public/assets/css'));
});

gulp.task('js-vendor', function() {
  return gulp
    .src(vendorScripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./src/public/assets/js'));
});

gulp.task('js', function() {
  return gulp
    .src(scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./src/public/assets/js'));
});

gulp.task('css-min', function() {
  return gulp
    .src('./landing/less/**/*.less')
    .pipe(less())
    .pipe(concat('style.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('./src/public/assets/css'));
});

gulp.task('js-vendor-min', function() {
  return gulp
    .src(vendorScripts)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./src/public/assets/js'));
});

gulp.task('js-min', function() {
  return gulp
    .src(scripts)
    .pipe(concat('bundle.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./src/public/assets/js'));
});

gulp.task('html', ['html-en', 'html-ko']);

gulp.task('watch', function() {
  gulp.watch('landing/html/**/*', ['html']);
  gulp.watch('landing/less/*.less', ['css', 'css-min']);
  gulp.watch('landing/js/**/*.js', ['js', 'js-vendor', 'js-vendor-min', 'js-min']);
});

gulp.task('default', ['html', 'css', 'js-vendor', 'js']);
gulp.task('prod', ['html', 'css-min', 'js-vendor-min', 'js-min']);
gulp.task('all', ['default', 'prod']);
