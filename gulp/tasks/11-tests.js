'use strict';
const gulp = require('gulp');
const wrap = require("gulp-wrap");
const templateCache = require('gulp-angular-templatecache');
const config = require('../config.js');
const fs = require('fs');
const protractor = require("gulp-protractor").protractor;

let buildParams = config.buildParams;
 
// Download and update the selenium driver
var webdriver_update = require('gulp-protractor').webdriver_update_specific;
 
// Downloads the selenium webdriver - stupid solution to pass extra args like ignore_ssl
gulp.task('webdriver_update', webdriver_update({
    webdriverManagerArgs: ['--ignore_ssl']
}));

var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
gulp.task('webdriver_standalone', webdriver_standalone);


function runTestsWithProtractor(){
    return gulp.src(buildParams.viewTestsDir() + '/*-spec.js')
    .pipe(protractor({
      configFile: buildParams.viewTestsDir() + '/protractor.config.js',
        args: [
            '--baseUrl', 'http://localhost:8003/primo-explore/search?vid=bclib_new',
            '--suite', 'production',
            // '--params.environment', 'test'
        ]
    }))
  .on('error', function(e) { throw e; });
}

gulp.task('run-tests', gulp.series('run', (cb) => {
  runTestsWithProtractor().on('end', cb);
}));
