'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var taskListing = require('gulp-task-listing');

//load custom gulp tasks
requireDir('./pipelines');

gulp.task('default', ['help']);

gulp.task('help', taskListing);