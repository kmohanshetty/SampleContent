'use strict';

var fs = require('fs');
var gulp = require('gulp');
var s3Pipeline = require('webui-pipeline-deploy-s3');
var packageVersion = JSON.parse(fs.readFileSync('package.json')).version;

gulp.task('s3:deploy', function() {
  s3Pipeline.deploy('dest/**', '1p-static/1p-frontend/' + packageVersion + '/', 'us-west-2', 'dest/');
});

gulp.task('s3:template', function() {
  s3Pipeline.template('//d3rm6si6l6yzgk.cloudfront.net/1p-frontend/' + packageVersion + '/', {
    css: {
      src: ['dest/assets/css/app.min.css'],
      dest: 'dest/assets/css/'
    },
    html: {
      src: ['./dest/index.html'],
      dest: 'dest/'
    },
    js: {
      src: [],
      dest: 'dest/assets/js/'
    }
  });
});