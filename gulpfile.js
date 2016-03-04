var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', ['move-index', 'move-skeleton', 'build']);
gulp.task('move-index', moveIndex);
gulp.task('move-skeleton', moveSkeleton);
gulp.task('build', build);
gulp.task('watch', watch);

function moveIndex() { return gulp.src('frontend/index.html').pipe(gulp.dest('dist')); };
function moveSkeleton() { return gulp.src(['node_modules/skeleton-css/*/*.{css,png}']).pipe(gulp.dest('dist')); };

var bify = browserify({
    entries: ['frontend/app.jsx'],
    cache: {},
    packageCache: {},
    transform: [babelify.configure({ presets: ['react'] })]
});
function build() {
    var stream = bify.bundle()
        .on('error', function (err) {
            gutil.log('Browserify', gutil.colors.red(err.name), '-', err.message);
            stream.end();
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'));
    return stream;
}
function watch() {
    function start() { gulp.start('build'); }
    bify.plugin(watchify);
    bify.on('update', start);
    bify.on('log', function (msg) { gutil.log('Browserify', msg); });
    start();
}
