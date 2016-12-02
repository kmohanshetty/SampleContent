//start a local web server, also supports proxying for API requests
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');
var plugins = require('./configs/plugins.js')();
//var serverApp = require('../server/server-app');

var options = {
  //livereload: true,   //XXX TODO need to figure out why performance drains when using this with watch + inject
  open: '/',
  host: 'localhost',
  https: false,
  port: 6789,
  proxies: [{
    source: '/api',
    target: 'http://localhost:9000/api'
  }],
  root: './dest/'
};

gulp.task('serve:local', ['serve:backend'], function () {

  gulp.src(options.root).pipe(plugins.webserver(options));

});

gulp.task('serve:backend', function () {
  //serverApp();
});

//build the application for production deployment and deploy it locally for viewing
gulp.task('serve', function () {

  plugins.runSequence('build:clean', 'build:resources:prod', 'build:template:prod', 'serve:local');

});
