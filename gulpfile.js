// import { task, series, src, dest, watch } from 'gulp';
import gulp from 'gulp';
// import sass from 'gulp-sass';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import prefix from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cache';
import { spawn } from 'child_process';
import browserSync, { reload, notify as _notify } from 'browser-sync';

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    return spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild Jekyll and page reload
gulp.task('jekyll-rebuild', gulp.series('jekyll-build', function () {
    reload();
}));

// Compile files
gulp.task('sass', function () {
    return gulp.src('assets/css/scss/main.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            onError: _notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

// Compression images
gulp.task('img', function() {
	return gulp.src('assets/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
    .pipe(gulp.dest('_site/assets/img'))
    .pipe(reload({stream:true}));
});

// Watch scss, html, img files
gulp.task('watch', function () {
    gulp.watch('assets/css/scss/**/*.scss', ['sass']);
    gulp.watch('assets/js/**/*.js', ['jekyll-rebuild']);
    gulp.watch('assets/img/**/*', ['img']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_pages/*.html', '_posts/*'], ['jekyll-rebuild']);
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', gulp.series('sass', 'img', 'jekyll-build', function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
}));



//  Default task
gulp.task('default', gulp.series('browser-sync', 'watch'));
