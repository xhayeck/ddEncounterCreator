var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server
var concat = require('gulp-concat'); //concat files
var open = require('gulp-open'); //open a url in web browser
var uglify = require('gulp-uglify'); //minify files
var browserify = require('browserify'); //bundles JS
var reactify = require('reactify'); //transforms react jsx to js
var source = require('vinyl-source-stream'); //use conventional text streams with gulp
var buffer = require('vinyl-buffer'); //buffers stream to allow for minification

var config = {
  port: 1337,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    css: './src/stylings/main.css',
    images: './src/images/*.gif',
    dist: './dist',
    mainJs: './src/main.js'
  }
};

//Start a local dev server
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    basepath: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());
  });

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['connect', 'js', 'css', 'html', 'open', 'images', 'watch']);
