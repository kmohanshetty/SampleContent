//build related gulp tasks
'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var runSequence = require('run-sequence');

gulp.task('build:clean', ['clean:dest']);
gulp.task('build:resources:prod', ['js:templates:build', 'js:build:prod', 'less:build:prod', 'bower:copy:all:prod', 'copy:assets:all']);
gulp.task('build:resources:local', ['js:templates:build', 'js:build:local', 'less:build:local', 'bower:copy:all:local', 'copy:assets:all']);
gulp.task('build:template:prod', ['template:build:prod']);

//build the application for production deployment
gulp.task('build', function () {

  util.log(util.colors.green('trying building application for production deployment'));

  runSequence('build:clean', 'build:resources:prod', 'build:template:prod', 'test:ci');

});
