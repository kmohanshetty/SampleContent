//start a local web server, also supports proxying for API requests
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var webserverPipeline = require('webui-pipeline-serve');

var options = {
  watch: false,
  serve: {
    livereload: false,   //XXX TODO need to figure out why performance drains when using this with watch + inject
    open: '/',
    host: 'local.1p.thomsonreuters.com',
    https: true,
    port: 6789,
    proxies: [{
      source: '/api',
      target: 'https://dev-snapshot.1p.thomsonreuters.com/api'
    }]
  },
  root: './dest/'
};

gulp.task('serve:local', function () {

  gulp.src(options.root).pipe(webserverPipeline.serve(options));

});

//build the application for production deployment and deploy it locally for viewing
gulp.task('serve', function () {

  runSequence('build:clean', 'build:resources:prod', 'build:template:prod', 'serve:local');

});
