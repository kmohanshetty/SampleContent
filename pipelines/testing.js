'use strict';

var fs = require('fs');
var gulp = require('gulp');
var protractor = require('gulp-protractor');
var tddTestPipeline = require('webui-pipeline-test-tdd');
var packageJson = JSON.parse(fs.readFileSync('package.json'));
var packageVersion = packageJson.version;
var packageName = packageJson.name;

var tddTestOptions = {
  options: {
    configFile: __dirname + '/../karma.conf.js',
    autoWatch: true,
    singleRun: false,
    browsers: ['PhantomJS']
  }
};

var ciTestOptions = {
  ci: true,
  options: {
    configFile: __dirname + '/../karma-coverage.conf.js',
    browsers: ['PhantomJS']
  },
  reports: {
    sonar: {
      projectKey: 'sonar:' + packageName + ':' + packageVersion,
      projectName: packageName,
      projectVersion: packageVersion,
      host: {
        url: 'http://sonar.oneplatform.build' // default value
      },
      exec: {
        maxBuffer: 1024 * 1024
      }
    }
  }
};

//run tests and keep runner open, for doing test driven development
//prebuild our ng2html templates first for Karma
gulp.task('test:tdd', ['js:templates:build'], function () {
  new tddTestPipeline.Server(tddTestOptions).start();
});

//will run all tests and generate coverage output, primarily for Jenkins
//prebuild our ng2html templates first for Karma
gulp.task('test:ci', ['js:templates:build'], function () {

  return new tddTestPipeline.Server(ciTestOptions).start();

});

gulp.task('test:e2e', function () {
  gulp.src(['./e2e/specs/*.js'])
    .pipe(protractor.protractor({
      configFile: __dirname + '/../protractor.conf.js'
    }))
    .on('error', function (e) {
      throw e;
    });
});
