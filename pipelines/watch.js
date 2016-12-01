//filesystem related gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var htmlFiles = './src/**/**/*.html';
var jsFiles = ['./src/**/**/*.js', '!./src/**/*.test.js'];
var lessFiles = './src/**/**/*.less';

gulp.task('watch', function () {

  gulp.watch(htmlFiles, function() {
    runSequence(
      ['js:templates:build'],
      ['template:build:local']
    );
  });

  gulp.watch(jsFiles, function() {
    runSequence(
      ['js:build:local']
    );
  });

  gulp.watch(lessFiles, function() {
    runSequence(
      ['less:build:local']
    );
  });

});
