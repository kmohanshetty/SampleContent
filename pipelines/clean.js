//clean related gulp tasks
'use strict';

var gulp = require('gulp');
var plugins = require('./configs/plugins.js')();

gulp.task('clean:dest', function () {

  //make sure del runs synchronously
  return plugins.del.sync([
    './dest/**'
  ]);

});
