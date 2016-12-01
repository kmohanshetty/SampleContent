//develop related gulp tasks
'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var runSequence = require('run-sequence');

gulp.task('develop', function () {

  util.log(util.colors.green('starting development environment'));

  runSequence('clean:dest', 'build:resources:local', 'template:build:local', 'serve:local', 'watch');

});