var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', ['move', 'build']);
gulp.task('move', ['move-index', 'move-skeleton', 'move-styles']);
gulp.task('move-index', moveIndex);
gulp.task('move-skeleton', moveSkeleton);
gulp.task('move-styles', moveStyles);
gulp.task('build', build);
gulp.task('watch', ['move'], watch);

function moveIndex() { return gulp.src('frontend/index.html').pipe(gulp.dest('dist')); };
function moveSkeleton() { return gulp.src(['node_modules/skeleton-css/*/*.{css,png}']).pipe(gulp.dest('dist')); };
function moveStyles() { return gulp.src(['frontend/styles.css']).pipe(gulp.dest('dist/css')); }

var bify = browserify({
    entries: ['frontend/app.jsx'],
    cache: {},
    packageCache: {},
    transform: [babelify.configure({ presets: ['react'] })]
});
var failOnError = true;
function build() {
    var stream = bify.bundle()
        .on('error', function (err) {
            gutil.log('Browserify', gutil.colors.red(err.name), '-', err.message);
            stream.end();
            if (failOnError) process.exit(1);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'));
    return stream;
}
function watch() {
    failOnError = false;
    gulp.watch(['frontend/*.{html,css}'], ['move-index', 'move-styles']);
    function start() { gulp.start('build'); }
    bify.plugin(watchify);
    bify.on('update', start);
    bify.on('log', function (msg) { gutil.log('Browserify', msg); });
    start();
}
