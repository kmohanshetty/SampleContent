'use strict';

var gulp = require('gulp');
var plugins = require('./configs/plugins.js')();

//run tests and keep runner open, for doing test driven development
//prebuild our ng2html templates first for Karma
gulp.task('test:tdd', ['js:templates:build'], function () {

  var server = new plugins.karma.Server({
    configFile: __dirname + '/../karma.conf.js',
    autoWatch: true,
    singleRun: false,
    browsers: ['PhantomJS'],
    reporters: ['mocha']
  });

  server.start();

});

//will run all tests and generate coverage output, primarily for Jenkins
//prebuild our ng2html templates first for Karma
gulp.task('test:ci', ['js:templates:build'], function () {

  var server = new plugins.karma.Server({
    configFile: __dirname + '/../karma-coverage.conf.js',
    browsers: ['PhantomJS']
  });

  server.start();

});

gulp.task('test:e2e', function () {
  /*gulp.src(['./e2e/specs/*.js'])
    .pipe(plugins.protractor.protractor({
      configFile: __dirname + '/../protractor.conf.js'
    }))
    .on('error', function (e) {
      throw e;
    });*/
});