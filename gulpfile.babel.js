import gulp from 'gulp';
import eslint from 'gulp-eslint';
import stylelint from 'gulp-stylelint';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';


gulp.task('lint-javascript', () => {
  return gulp.src('src/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('lint-scss', () => {
  return gulp.src('src/**/*.scss')
  .pipe(stylelint({
    reporters: [{formatter: 'string', console: true}]
  }));
});

gulp.task('jshint', function () {
  return gulp.src(['./src/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('sass', function () {
  return gulp.src('src/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest("public/stylesheets"))
  .pipe(browserSync.stream());
});

gulp.task('babel', () => {
  return gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('public/javascripts'))
  .pipe(browserSync.stream());
});

gulp.task('lint', ['lint-scss', 'lint-javascript', 'jshint']);

gulp.task('default', ['lint', 'sass', 'babel']);
