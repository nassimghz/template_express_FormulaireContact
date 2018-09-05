/* jshint esversion : 6 */

// @root/gulpfile.js

/* @ag
  GULP SETUP
    1 -> https://gulpjs.com/
      voir les premières commandes
    2 -> https://github.com/gulpjs/gulp/tree/4.0
      -> https://github.com/gulpjs/gulp/blob/4.0/docs/API.md
*/

const gulp = require('gulp'); // ET SURTOUT ... SI BESOIN
const sass = require('gulp-sass');  // CHECK
const babel = require('gulp-babel'); // LA
const uglify = require('gulp-uglify'); // DOC
const cleanCSS = require('gulp-clean-css'); // OK !?

const paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'public/styles/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'public/js/'
  }
};

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'assets' ]);
}

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

/*
 * Define our tasks using plain functions
 */
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
   // observer les changements ...
  gulp.watch(paths.scripts.src, scripts); // @ag: sur les scripts avec le callback es6
  gulp.watch(paths.styles.src, styles); // @ag: sur les styles avec le callback styles
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 * @ag : me premier arg doit être un callback ou un
 */
const build =  gulp.parallel(styles, scripts);

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);
