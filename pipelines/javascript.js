//application related javascript gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');
var plugins = require('./configs/plugins.js')();
//var ngHtml2Js = require('gulp-ng-html2js');

//var angularTemplates = ['./src/modules/**/**/*.html'];
var jsLintFiles = ['*.js', './pipelines/**/*.js', './src/**/**/*.js'];
var jsBuildFiles = ['**/lib/**/*.js', '**/**/*.js', '!**/**/*.test.js'];
var jsBuildDest = './dest/assets/js/';
var minifiedJSName = 'app.min.js';

var onLintLocalError = function() {};

gulp.task('js:lint', ['js:lint:prod']);
gulp.task('js:build', ['js:build:prod']);

gulp.task('js:lint:prod', function () {

  return gulp.src(jsLintFiles)
    .pipe(plugins.jshint())
    .pipe(plugins.jscs())
    .pipe(plugins.jscsStylish.combineWithHintResults())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));

});

gulp.task('js:lint:local', function () {

  return gulp.src(jsLintFiles)
    .pipe(plugins.jshint())
    .pipe(plugins.jscs())
    .on('error', onLintLocalError)
    .pipe(plugins.jscsStylish.combineWithHintResults())
    .pipe(plugins.jshint.reporter('jshint-stylish'));

});

gulp.task('js:build:prod', ['js:lint:prod'], function () {

  /*jshint camelcase: false */
  //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  return gulp.src(jsBuildFiles, {base: './src', cwd: './src'})
    .pipe(plugins.concat(minifiedJSName))
    .pipe(plugins.uglify({output: { quote_style: 3 }}))
    .pipe(gulp.dest(jsBuildDest));
  //jscs:enable requireCamelCaseOrUpperCaseIdentifiers

});

gulp.task('js:templates:build', function () {
  /*gulp.src(angularTemplates)
    .pipe(ngHtml2Js({
      moduleName: 'ipa.templates',
      prefix: 'modules/'
    }))
    .pipe(plugins.concat('ipa-templates.js'))
    .pipe(gulp.dest('dest/assets/js/'));*/
});

gulp.task('js:build:local', ['js:lint:local'], function () {

  return gulp.src(jsBuildFiles, {base: './src', cwd: './src'})
    .pipe(gulp.dest(jsBuildDest));

});