var path = require('path');
const gulp = require('gulp');

const webp = require('gulp-webp');
var gulpCopy = require('gulp-copy');
var rename = require("gulp-rename");
var imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');

var sass = require('gulp-sass');

var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var inject = require('gulp-inject');

var imgSrc = ['src/assets/img/projects/**/*.jpg', 'src/assets/img/projects/**/*.png'];
var imgDest = 'dist/assets/img/all-projects';


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

// image-resize
gulp.task('image-resize', function () {
  gulp.src('test.png')
    .pipe(imageResize({
      width : 1000,
      // height : 100,
      // crop : true,
      upscale : false,
      quality: 0.8,
      format: "jpg",
      imageMagick: true
    }))
    .pipe(gulp.dest(imgDest));
});

// imagemin
gulp.task('imgmin', () =>
  gulp.src(imgSrc)
    .pipe(newer(imgDest))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      ]))
    .pipe(gulp.dest(imgDest))
);


gulp.task('img', () =>
  gulp.src(imgSrc)
    // .pipe(gulpCopy('dist/assets/img/all-projects', { prefix: 4 }))
    // .pipe(newer(imgDest))
    .pipe(imageResize({
      width : 1000,
      // height : 100,
      // crop : true,
      upscale : false,
      quality: 0.8,
      format: "jpg",
      imageMagick: true
    }))
    // .pipe(webp())
    .pipe(gulp.dest('dist/assets/img/all-projects'))
);
//
// gulp.task('jp2', () =>
//   gulp.src(imgSrc)
//     .pipe(imageResize({
//       width : 1000,
//       upscale : false,
//       quality: 0.8,
//       format: "jp2",
//       imageMagick: true
//     }))
//     .pipe(gulp.dest('dist/assets/img/all-projects'))
// );

gulp.task('img-mobile', () =>
  gulp.src(imgSrc)
    // .pipe(newer(imgDest))
    .pipe(imageResize({
      width : 700,
      // height : 100,
      // crop : true,
      upscale : false,
      quality: 0.8,
      format: "jpg",
      imageMagick: true
    }))
    // .pipe(webp())
    .pipe(rename(function (path) { path.basename += "-mobile"; }))
    .pipe(gulp.dest('dist/assets/img/all-projects'))
);

gulp.task( 'webp', () =>
  gulp.src(imgSrc)
    .pipe(imageResize({
      width : 1000,
      upscale : false,
      quality: 0.8,
      format: "jpg",
      imageMagick: true
    }))
    .pipe(webp({
      quality: 70,
      metadata: ["icc"]
    }))
    .pipe(gulp.dest(imgDest))
);

gulp.task( 'webp-mobile', () =>
  gulp.src(imgSrc)
    .pipe(imageResize({
      width : 700,
      upscale : false,
      quality: 0.8,
      format: "jpg",
      imageMagick: true
    }))
    .pipe(webp({
      quality: 70,
      metadata: ["icc"]
    }))
    .pipe(rename(function (path) { path.basename += "-mobile"; }))
    .pipe(gulp.dest(imgDest))
);


gulp.task('img-pipeline', gulp.series('img', 'img-mobile', 'webp', 'webp-mobile'))

gulp.task('sass', function () {
 return gulp.src('./src/assets/scss/main.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist/assets/css/'));
});