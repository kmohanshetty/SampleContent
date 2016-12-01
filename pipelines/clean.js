//clean related gulp tasks
'use strict';

var gulp = require('gulp');
var handyman = require('pipeline-handyman');

gulp.task('clean:dest', function () {

  //runs synchronously
  return handyman.clean([
    './dest/**'
  ]);

});
