/**
 * In order to run this Gulp config, ensure to have
 * "type": "module",
 * present in the package.json
 * Might need to be disabled to compile the bundle
 */

import path from 'path';
import gulp from 'gulp';

import webp from 'gulp-webp';
import gulpCopy from 'gulp-copy';
import rename from "gulp-rename";
import imageResize from 'gulp-image-resize';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';

import sass from 'gulp-sass';

import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import inject from 'gulp-inject';

var imgSrc = ['src/assets/img/projects/**/*.jpg', 'src/assets/img/projects/**/*.png'];
// var imgSrc = ['src/assets/img/projects/homers/*.jpg', 'src/assets/img/projects/homers/*.png'];
var imgDest = 'dist/assets/img/all-projects';

const webPOptions = {
  preset: "picture",
  lossless: false,
  quality: 85,
  alphaQuality: 80,
  metadata: ["icc"],
}
const JPGOptions = {
  background: "#FFFFFF",
  flatten: true,
  upscale : false,
  quality: 0.8,
  width: 1000,
  format: "jpg",
}

gulp.task('svgstore', function () {
  return gulp
    .src('src/assets/img/techno-icons/*.svg')
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          name: "cleanupIDs",
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

// imagemin
gulp.task('imgmin', () =>
  gulp.src(imgSrc)
    // .pipe(newer(imgDest))
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
      ...JPGOptions,
      width : 1000,
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
      ...JPGOptions,
      width : 700,
    }))
    // .pipe(webp())
    .pipe(rename(function (path) { path.basename += "-mobile"; }))
    .pipe(gulp.dest('dist/assets/img/all-projects'))
);

gulp.task( 'webp', () =>
  gulp.src(imgSrc)
    // .pipe(newer(imgDest))
    .pipe(imageResize({
      ...JPGOptions,
      width : 1000,
      quality: 1,
    }))
    .pipe(webp({
      // resize: { width: 1000, height: 1500 },
      ...webPOptions,
    }))
    .pipe(gulp.dest(imgDest))
);

gulp.task( 'webp-mobile', () =>
  gulp.src(imgSrc)
    // .pipe(newer(imgDest))
    .pipe(imageResize({
      ...JPGOptions,
      width : 700,
      quality: 1,
    }))
    .pipe(webp({
      ...webPOptions,
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
