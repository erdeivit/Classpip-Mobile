'use strict';

var gulp = require('gulp');
var sassLint = require('gulp-sass-lint');

gulp.task('default', function () {
  return gulp.src('src/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
