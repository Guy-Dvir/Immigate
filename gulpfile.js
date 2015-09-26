var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var jade        = require('gulp-jade');
var prefix      = require('gulp-autoprefixer');

/**
 *launch the Server
 */
gulp.task('browser-sync', ['sass', 'jade'], function() {
    browserSync({
        server: {
            baseDir: ''
        },
        notify: false
    })
});

/**
*error check
*/
function errorlog(error){
   console.error.bind(error);
   this.emit('end')
}

/**
 * Compile main.sass into main.css
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/main.sass')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .on ('error', errorlog)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream:true}))
});

/**
*jade - convert main jade files into html in the root folder
*/
gulp.task('jade', function () {
  return gulp.src('_jadefiles/index.jade')
  .pipe(jade({
     pretty: true
   }))
  .on ('error', errorlog)
  .pipe(gulp.dest(''))
  .pipe(browserSync.reload({stream:true}))
});

/**
 * Watch scss files for changes & recompile
 * Watch html/jade files, reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**.sass', ['sass']);
    gulp.watch('_jadefiles/**', ['jade'])
});

/**
 * Default task, running just `gulp` will compile the sass,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
