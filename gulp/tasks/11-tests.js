'use strict';
const gulp = require('gulp');
const wrap = require("gulp-wrap");
const templateCache = require('gulp-angular-templatecache');
const config = require('../config.js');
const fs = require('fs');
const nightwatch = require("gulp-nightwatch");
const browserSyncManager = require('../browserSyncManager.js');

let buildParams = config.buildParams;
 
function runTestsWithNightwatch(){
    return gulp.src('gulpfile.js')
    .pipe(nightwatch({
      configFile: buildParams.viewTestsDir() + '/nightwatch.conf.js',
        cliArgs: [
            '--tag', 'production',
            '--headless'
        ]
    }))
    .on('error', function(e) { throw e; });
}

gulp.task('run-tests', gulp.series('select-view', 'connect:primo_explore','reinstall-primo-node-modules','custom-js','custom-scss','custom-css', (cb) => {
  return runTestsWithNightwatch().on('end', cb);
}));

gulp.task('test', gulp.series('run-tests', (cb) => {
  browserSyncManager.closeServer('production');
  cb();
}));
