'use strict';
const gulp = require('gulp');
const wrap = require("gulp-wrap");
const templateCache = require('gulp-angular-templatecache');
const config = require('../config.js');
const fs = require('fs');
const nightwatch = require("gulp-nightwatch");

let buildParams = config.buildParams;
 
function runTestsWithNightwatch(){
    return gulp.src('gulpfile.js')
    .pipe(nightwatch({
      configFile: buildParams.viewTestsDir() + '/nightwatch.conf.js',
        cliArgs: [
            '--tag', 'production',
        ]
    }))
  .on('error', function(e) { throw e; });
}

gulp.task('run-tests', gulp.series('run', (cb) => {
  runTestsWithNightwatch().on('end', cb);
}));
