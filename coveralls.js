'use strict';

var gulp = require('gulp');
var coveralls = require('gulp-coveralls');

gulp.task('default', function() {

    if (!process.env.TRAVIS) {
      return;
    }
    return gulp.src('coverage/coverage.lcov').pipe(coveralls());
});
