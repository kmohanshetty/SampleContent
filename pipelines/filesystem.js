//filesystem related gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');

gulp.task('copy:templates', function () {
  return gulp.src(['src/modules/**/*.html'])
    .pipe(gulp.dest('./dest/modules/'));
});

gulp.task('copy:assets:data', function () {
  return gulp.src(['src/assets/data/**/*'])
    .pipe(gulp.dest('./dest/assets/data'));
});

gulp.task('copy:assets:images', function () {
  return gulp.src(['src/assets/img/**/*'])
    .pipe(gulp.dest('./dest/assets/img'));
});

gulp.task('copy:components:images', function () {
  return gulp.src(['src/modules/components/**/img/*'])
    .pipe(gulp.dest('./dest/modules/components'));
});

gulp.task('copy:views:images', function () {
  return gulp.src(['src/modules/views/**/img/*'])
    .pipe(gulp.dest('./dest/modules/views'));
});

gulp.task('copy:assets:robots', function () {
  return gulp.src(['src/assets/txt/robots.txt'])
    .pipe(gulp.dest('./dest/'));
});

gulp.task('copy:assets:prod:all', ['copy:assets:data', 'copy:assets:images', 'copy:components:images', 'copy:views:images', 'copy:assets:robots']);
gulp.task('copy:assets:local:all', ['copy:assets:data', 'copy:assets:images', 'copy:components:images', 'copy:views:images', 'copy:templates', 'copy:assets:robots']);
