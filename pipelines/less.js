//CSS related gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');

var csscomb = require('gulp-csscomb');
var csslint = require('gulp-csslint');
var minifyCssPipeline = require('pipeline-minify-css');
var lessPipeline = require('pipeline-compile-less');

var lessLintFiles = ['./src/**/*.less', '!./src/less/bootstrap.less'];
var lessCombFiles = './src/**/*.less';
var lessCombDest = './src/';
var lessBuildFiles = ['./src/less/bootstrap.less', './src/modules/**/less/*.less'];
var lessBuildDest = './dest/assets/css';
var autoprefixerParams = {
  browsers: ['last 2 versions', 'Safari >=7', 'Explorer >= 9']
};

gulp.task('less:lint', ['less:lint:prod']);
gulp.task('less:build', ['less:build:prod']);

gulp.task('less:comb', ['less:lint:local'], function () {

  return gulp.src(lessCombFiles)
    .pipe(csscomb())
    .pipe(gulp.dest(lessCombDest));
});

gulp.task('less:lint:prod', function () {

  return gulp.src(lessLintFiles)
    .pipe(lessPipeline.compileLESS({addSourceMaps: false, concatCSS: false}))
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.reporter())
    .pipe(csslint.failReporter());

});

gulp.task('less:lint:local', function () {

  return gulp.src(lessLintFiles)
    .pipe(lessPipeline.compileLESS({addSourceMaps: false, concatCSS: false}))
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.reporter());

});

gulp.task('less:build:prod', ['less:lint:prod'], function () {

  return gulp.src(lessBuildFiles)

    .pipe(lessPipeline.compileLESS(
      {
        concatCSS: true,
        outputFileName: 'app.min.css',
        addSourceMaps: false,
        plugins: {
          autoprefix: autoprefixerParams
        }
      }))
    .pipe(minifyCssPipeline.minifyCSS(
      {
        concatFilename: 'app.min.css',
        addSourceMaps: false
      }))
    .pipe(gulp.dest(lessBuildDest));

});

gulp.task('less:build:local', ['less:lint:local'], function () {

  return gulp.src(lessBuildFiles)
    .pipe(lessPipeline.compileLESS(
      {
        concatCSS: false,
        addSourceMaps: false,
        plugins: {
          autoprefix: autoprefixerParams
        }
      }))
    .pipe(gulp.dest(lessBuildDest));

});
