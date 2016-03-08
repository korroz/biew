var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var path = require('path');
var bs = require('browser-sync').create();

gulp.task('default', ['move', 'build']);
gulp.task('move', ['move-index', 'move-skeleton', 'move-mousetrap', 'move-styles']);
gulp.task('move-index', moveIndex);
gulp.task('move-skeleton', moveSkeleton);
gulp.task('move-mousetrap', moveMousetrap);
gulp.task('move-styles', moveStyles);
gulp.task('build', build);
gulp.task('watch:noserve', ['move', 'browser-sync'], watch);
gulp.task('watch', ['move', 'serve', 'browser-sync'], watch);
gulp.task('serve', serve);
gulp.task('browser-sync', browserSync);

function moveIndex() { return gulp.src('frontend/index.html').pipe(gulp.dest('dist')).pipe(bs.stream()); };
function moveSkeleton() { return gulp.src(['node_modules/skeleton-css/*/*.{css,png}']).pipe(gulp.dest('dist')).pipe(bs.stream()); };
function moveMousetrap() { return gulp.src(['node_modules/mousetrap/mousetrap.min.js']).pipe(gulp.dest('dist/js')); }
function moveStyles() { return gulp.src(['frontend/styles.css']).pipe(gulp.dest('dist/css')).pipe(bs.stream()); }

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
        .pipe(gulp.dest('dist'))
        .pipe(bs.stream());
    return stream;
}
function watch() {
    failOnError = false;
    gulp.watch(['frontend/*.html'], ['move-index']);
    gulp.watch(['frontend/*.css'], ['move-styles']);
    function start() { gulp.start('build'); }
    bify.plugin(watchify);
    bify.on('update', start);
    bify.on('log', function (msg) { gutil.log('Browserify', msg); });
    start();
}
function serve() {
    var server, biewId = path.resolve(__dirname, './backend.js'), restarting = false;
    function start() {
        delete require.cache[biewId];   // Ensure biew isn't cached.
        server = require('./backend.js')({
            port: 3434,
            path: 'media'
        }, function () { restarting = false; bs.reload(); });
    };
    gulp.watch(['backend.js'], function () {
        if (!restarting) {
            restarting = true;
            gutil.log('Backend changed, restarting biew server..');
            server.close(start);
        }
        else gutil.log('Backend changed again.. but we are still restarting, please wait a (long) bit.');
    });
    start();
}
function browserSync(done) {
    bs.init({
        proxy: 'localhost:3434', open: false
    }, done);
}
