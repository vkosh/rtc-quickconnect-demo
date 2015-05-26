var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require("vinyl-source-stream");
var express = require('express');
var livereload = require('gulp-livereload');

var config = {
  name: 'test',
  listen: 3000,
  dist: './dist/',
  entry: 'src/index.js',
  files: {
    src: 'src/**/*.js',
    static: 'pub/**/*.html'
  }
}

gulp.task('build', ['build-src', 'build-static']);

gulp.task('build-src', function () {
  browserify()
    .add('src/index.js', {entry: true})
    .bundle()
    .pipe(source('index.js'))
    .pipe(rename(config.name + '.js'))
    .pipe(buffer())
    .pipe(gulp.dest(config.dist + 'scripts/'))
});

gulp.task('build-static', function () {
  gulp.src(config.files.static)
    .pipe(gulp.dest(config.dist));
});

gulp.task('serve', ['watch'], function () {
  express()
    .use(express.static(config.dist))
    .listen(config.listen, '0.0.0.0');
});

gulp.task('watch', function () {
  for (var type in config.files) {
    gulp.watch(config.files[type], ['build-' + type]);
  }
  livereload.listen();
  gulp.watch(config.dist + '**').on('change', livereload.changed);
});

gulp.task('default', ['build', 'serve']);
