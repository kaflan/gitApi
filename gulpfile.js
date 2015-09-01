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
var gulpif = require('gulp-if');
gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js/'))
});
gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'));
});
gulp.task('bower', function() {
  gulp.src('index.html')
    .pipe(wiredep({
      directory: 'bower_components'
    }))
    .pipe(gulp.dest('./'));
});
gulp.task('sass', function() {
  gulp.src('css/bundle.scss')
    .pipe(sass())
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
gulp.task('default', ['concat', 'connect', 'watch', 'bower', 'minify-css', 'js']);
