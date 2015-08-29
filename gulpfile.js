var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var notify = require("gulp-notify");
var rename = require("gulp-rename");
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var wiredep = require('wiredep').stream;
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js/'))
});

gulp.task('bower', function() {
  gulp.src('index.html')
    .pipe(wiredep({
      directory: 'bower_components'
    }))
    .pipe(gulp.dest('./'));
});
gulp.task('concat', function() {
  gulp.src('css/*.css')
    .pipe(concat('style.css'))
    .pipe(autoprefixer('> 1%', 'last 12 versions', 'ie 9'))
    .pipe(minifyCss(''))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('css/'))
    .pipe(connect.reload())
    .pipe(notify('Done!'));
});
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});
gulp.task('watch', function() {
  gulp.watch('css/*.css');
});
gulp.task('default', ['concat', 'connect', 'watch', 'bower', 'js']);
