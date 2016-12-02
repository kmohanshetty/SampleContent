//filesystem related gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');
var plugins = require('./configs/plugins.js')();

var htmlFiles = './src/**/**/*.html';
var jsFiles = ['./src/**/**/*.js', '!./src/**/*.test.js'];
var lessFiles = './src/**/**/*.less';

gulp.task('watch', function () {

  gulp.watch(htmlFiles, function() {
    plugins.runSequence(
      ['js:templates:build', 'copy:templates'],
      ['template:build:local']
    );
  });

  gulp.watch(jsFiles, function() {
    plugins.runSequence(
      ['js:build:local']
    );
  });

  gulp.watch(lessFiles, function() {
    plugins.runSequence(
      ['less:build:local']
    );
  });

});
