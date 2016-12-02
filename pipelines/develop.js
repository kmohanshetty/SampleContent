//develop related gulp tasks
'use strict';

var gulp = require('gulp');
var plugins = require('./configs/plugins.js')();

gulp.task('develop', function () {

  plugins.util.log(plugins.util.colors.green('starting development environment'));

  plugins.runSequence('clean:dest', 'build:resources:local', 'template:build:local', 'serve:local', 'watch');

});