var path = require('path');
const gulp = require('gulp');
const webp = require('gulp-webp');
var gulpCopy = require('gulp-copy');

var sass = require('gulp-sass');

var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var inject = require('gulp-inject');

gulp.task('svgstore', function () {
  return gulp
    .src('src/assets/img/techno-icons/*.svg')
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(gulp.dest('dist/assets/img'));
});


gulp.task('img', () =>
  gulp.src('src/assets/img/projects/**/*.jpg')
    .pipe(gulpCopy('dist/assets/img/all-projects', { prefix: 4 }))
    .pipe(webp())
    .pipe(gulp.dest('dist/assets/img/all-projects'))
);

gulp.task('sass', function () {
 return gulp.src('./src/assets/scss/main.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist/assets/css/'));
});