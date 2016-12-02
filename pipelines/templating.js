'use strict';

var gulp = require('gulp');
var plugins = require('./configs/plugins.js')();

var appFiles = [
  'dest/assets/js/**/lib/onepsecurity.js',
  'dest/assets/js/**/lib/includes.js',
  'dest/assets/js/**/layouts/*.js',
  'dest/assets/js/ipa-templates.js',
  'dest/assets/js/modules/bootstrap/bootstrap-module.js',
  'dest/assets/js/modules/**/**/*-module.js',
  'dest/assets/js/modules/**/**/*.js',
  'dest/assets/js/assets/**/*.js',
  'dest/assets/css/**/*.css',
  '!dest/assets/js/vendor/**/**',
  '!dest/assets/css/vendor/**/**',
  '!dest/assets/elements/vendor/**/**'
];

var minifiedProductionFiles = [
  'dest/assets/js/vendor/vendor.min.js',
  'dest/assets/js/app.min.js',
  'dest/assets/js/ipa-templates.js',
  'dest/assets/css/vendor/vendor.min.css',
  'dest/assets/css/app.min.css'
];

var mockFiles = appFiles.concat([
  './test/mock/**/*.js',
  './test/mock/**/*.json'
]);

function transformFilepath(filepath) {
  var ext = filepath.split('.')[filepath.split('.').length - 1];
  var path = '';

  if (filepath.indexOf('bower_components') > -1) {
    path = filepath.replace('../../bower_components', '/assets/' + ext + '/vendor');
  } else {
    path = filepath.replace('/dest', '');
  }

  switch (ext) {
    case 'js':
      path = '<script src="' + path + '"></script>';
      break;
    case 'css':
      path = '<link rel="stylesheet" href="' + path + '"/>';
      break;
  }

  return path;
}

//needs to be run after all app and vendor JS / CSS has been built into the dest/ directory
//it will then inject those paths into index.html
gulp.task('template:build:local', ['template:build:mock'], function () {
  return gulp.src('./src/layouts/index.html')
    .pipe(plugins.wiredep.stream({
      exclude: ['bower_components/tr-webui/dist/build/css/'],
      fileTypes: {
        html: {
          replace: {
            css: transformFilepath,
            js: transformFilepath
          }
        }
      }
    }))
    .pipe(plugins.inject(gulp.src(appFiles, {read: false}), {transform: transformFilepath}))
    .pipe(gulp.dest('./dest'));

});

gulp.task('template:build:prod', function () {
  return gulp.src('./src/layouts/index.html')
    .pipe(plugins.inject(gulp.src(minifiedProductionFiles, {read: false}), {
      name: 'bower',
      transform: transformFilepath
    }))
    .pipe(plugins.inject(gulp.src(appFiles, {read: false}), {transform: transformFilepath}))
    .pipe(gulp.dest('./dest'));
});

gulp.task('template:build:mock', function () {
  return gulp.src('./src/layouts/mock.html')
    .pipe(plugins.wiredep.stream({
      exclude: ['bower_components/tr-webui/dist/build/css/'],
      fileTypes: {
        html: {
          replace: {
            css: transformFilepath,
            js: transformFilepath
          }
        }
      }
    }))
    .pipe(plugins.inject(gulp.src(mockFiles, {read: false}), {transform: transformFilepath}))
    .pipe(gulp.dest('./dest'));

});

gulp.task('html:lint:layouts', function () {
  plugins.htmlAngularValidate.validate([
      './src/layouts/*'
    ],
    {
      customtags: ['*'],
      customattrs: ['*'],
      reportpath: './reports/validation/html-angular-validate/layouts-report.json'
    }).then(function (result) {

      if (result.allpassed) {
        console.log('HTML validator passed all files');
      } else {

        outputErrorStatus(result);

        outputErrorMessages(result);
      }
    }, function (err) {
      console.log('HTML validator error: ' + err);
    });
});

gulp.task('html:lint:templates', function () {
  plugins.htmlAngularValidate.validate([
      './src/modules/**/*.html'
    ],
    {
      tmplext: '.html',
      customtags: ['*'],
      customattrs: ['*'],
      reportpath: './reports/validation/html-angular-validate/templates-report.json',
      relaxerror: [
        'Attribute “href” without an explicit value seen. The attribute may be dropped by IE7.',
        'Attribute “src” without an explicit value seen. The attribute may be dropped by IE7.',
        'Bad value “” for attribute “src” on element “img”: Must be non-empty.',
        'Bad value “button” for attribute “role” on element “li”.',
        'The “aria-labelledby” attribute must point to an element in the same document.',
        'Empty heading.'
      ]
    }).then(function (result) {

      if (result.allpassed) {
        console.log('HTML validator passed all files');
      } else {

        outputErrorStatus(result);

        outputErrorMessages(result);
      }
    }, function (err) {
      console.log('HTML validator error: ' + err);
    });
});

function outputErrorStatus(result) {
  var resultOutput = [
    'HTML Validator found errors for',
    result.filesfailed,
    'out of',
    result.fileschecked,
    'files total'
  ];

  console.log(resultOutput.join(' '));
}

function outputErrorMessages(result) {
  var currentErrorObj;
  var err;
  var fileOutput;
  var errorOutput;

  for (var i = 0; i < result.failed.length; i += 1) {
    currentErrorObj = result.failed[i];

    fileOutput = [
      '  \x1b[0m',
      currentErrorObj.filepath,
      'has',
      currentErrorObj.numerrs,
      'errors'
    ];

    console.log(fileOutput.join(' '));

    for (var j = 0; j < currentErrorObj.errors.length; j += 1) {
      err = currentErrorObj.errors[j];

      errorOutput = [
        '    \x1b[31m- [',
        'Line',
        err.line,
        ':',
        'Column',
        err.col,
        ']',
        err.msg
      ];

      console.log(errorOutput.join(' '));
    }
  }
}
