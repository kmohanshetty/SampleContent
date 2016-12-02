//CSS related gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');
var plugins = require('./configs/plugins.js')();

var lessLintFiles = ['./src/**/*.less', '!./src/less/bootstrap.less'];
var lessCombFiles = './src/**/*.less';
var lessCombDest = './src/';
var lessBuildFiles = ['./src/less/bootstrap.less', './src/modules/**/less/*.less'];
var lessBuildDest = './dest/assets/css';
var autoprefixerParams = {
  browsers: ['last 2 versions', 'Safari >=7', 'Explorer >= 9']
};

gulp.task('less:lint', ['less:lint:prod']);
gulp.task('less:build', ['less:build:prod']);

gulp.task('less:comb', ['less:lint:local'], function () {

  return gulp.src(lessCombFiles)
    .pipe(plugins.csscomb())
    .pipe(gulp.dest(lessCombDest));
});

gulp.task('less:lint:prod', function () {

  return gulp.src(lessLintFiles)
    .pipe(plugins.less())
    .pipe(plugins.csslint('csslintrc.json'))
    .pipe(plugins.csslint.reporter())
    .pipe(plugins.csslint.failReporter());

});

gulp.task('less:lint:local', function () {

  return gulp.src(lessLintFiles)
    .pipe(plugins.less())
    .pipe(plugins.csslint('csslintrc.json'))
    .pipe(plugins.csslint.reporter());

});

gulp.task('less:build:prod', ['less:lint:prod'], function () {

  return gulp.src(lessBuildFiles)
    .pipe(plugins.less())
    .pipe(plugins.concat('app.min.css'))
    .pipe(plugins.autoprefixer(autoprefixerParams))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(lessBuildDest));

});

gulp.task('less:build:local', ['less:lint:local'], function () {

  return gulp.src(lessBuildFiles)
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer(autoprefixerParams))
    .pipe(gulp.dest(lessBuildDest));

});