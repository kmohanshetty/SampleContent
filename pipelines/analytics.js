'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('analytics:lint:all', function (cb) {
  exec('sh node_modules/webui-component-analytics/bin/analytic-linter.sh -a', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});


gulp.task('analytics:lint', function (cb) {
  exec('sh node_modules/webui-component-analytics/bin/analytic-linter.sh -b develop', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});