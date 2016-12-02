//bower components related gulp tasks for
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');
var plugins = require('./configs/plugins.js')();

gulp.task('bower:copy:elements', function () {
  return gulp.src(
    [
      './bower_components/**/**/*.html',
      './bower_components/**/**/*.css',
      '!bower_components/tr-webui/dist/build/components/**/**/*.css',
      '!bower_components/tr-webui/dist/build/css/*.css'
    ])
    .pipe(gulp.dest('./dest/assets/elements/vendor/'));
});

gulp.task('bower:copy:css:local', function () {

  return gulp.src(plugins.wiredep({exclude: ['bower_components/tr-webui/dist/build/css/']}).css, {base: './bower_components', cwd: './bower_components'})
    .pipe(gulp.dest('./dest/assets/css/vendor/'));
});

gulp.task('bower:copy:css:prod', function () {

  return gulp.src(plugins.wiredep({exclude: ['bower_components/tr-webui/dist/build/css/']}).css, {base: './bower_components', cwd: './bower_components'})
    .pipe(plugins.concat('vendor.min.css'))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('./dest/assets/css/vendor/'));
});

gulp.task('bower:copy:js:local', function () {

  return gulp.src(plugins.wiredep().js, {base: './bower_components', cwd: './bower_components'})
    .pipe(gulp.dest('./dest/assets/js/vendor/'));
});

gulp.task('bower:copy:js:prod', function () {

  return gulp.src(plugins.wiredep().js, {base: './bower_components', cwd: './bower_components'})
    .pipe(plugins.concat('vendor.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./dest/assets/js/vendor/'));
});

gulp.task('bower:copy:fonts:local', function () {
  //assets/css/fonts
  var faFontPath = 'vendor/font-awesome/fonts/';

  var faFontsStream = gulp.src('./bower_components/font-awesome/fonts/**')
    .pipe(gulp.dest('./dest/assets/css/' + faFontPath));

  var webuiFontsStream = gulp.src('./bower_components/tr-webui/dist/build/assets/fonts/**/')
    .pipe(gulp.dest('./dest/assets/fonts/vendor/tr-webui'));

  return plugins.mergeStream(faFontsStream, webuiFontsStream);
});

gulp.task('bower:copy:fonts:prod', function () {
  var faFontsStream = gulp.src('./bower_components/font-awesome/fonts/**')
    .pipe(gulp.dest('./dest/assets/css/fonts'));

  var webuiFontsStream = gulp.src('./bower_components/tr-webui/dist/build/assets/fonts/**/')
    .pipe(gulp.dest('./dest/assets/fonts/vendor/tr-webui'));

  return plugins.mergeStream(faFontsStream, webuiFontsStream);
});

gulp.task('bower:copy:images:local', function() {
  return gulp.src('./bower_components/tr-webui/dist/build/assets/img/**/*')
             .pipe(gulp.dest('./dest/assets/img'));
});

gulp.task('bower:copy:images:prod', function () {
  return gulp.src('./bower_components/tr-webui/dist/build/assets/img/**/*')
             .pipe(gulp.dest('./dest/assets/img/'));

});

gulp.task('bower:copy:all:local', ['bower:copy:css:local', 'bower:copy:js:local', 'bower:copy:elements', 'bower:copy:fonts:local', 'bower:copy:images:local']);
gulp.task('bower:copy:all:prod', ['bower:copy:css:prod', 'bower:copy:js:prod', 'bower:copy:elements', 'bower:copy:fonts:prod', 'bower:copy:images:prod']);
