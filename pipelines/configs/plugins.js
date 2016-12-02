'use strict';

module.exports = function() {

  var plugins = {
    autoprefixer: require('gulp-autoprefixer'),
    concat: require('gulp-concat'),
    csscomb:require('gulp-csscomb'),
    csslint: require('gulp-csslint'),
    del: require('del'),
    inject: require('gulp-inject'),
    jscs: require('gulp-jscs'),
    jscsStylish: require('gulp-jscs-stylish'),
    jshint: require('gulp-jshint'),
    karma: require('karma'),
    less: require('gulp-less'),
    mergeStream: require('merge-stream'),
    minifyCss: require('gulp-minify-css'),
    protractor: require('gulp-protractor'),
    requireDir: require('require-dir'),
    runSequence: require('run-sequence'),
    taskListing: require('gulp-task-listing'),
    uglify: require('gulp-uglify'),
    util: require('gulp-util'),
    webserver: require('gulp-webserver'),
    wiredep: require('wiredep')
  };

  return plugins;
};