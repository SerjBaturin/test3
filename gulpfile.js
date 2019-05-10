const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


function js() {
	return gulp.src('src/index.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
};

function css() {
	return gulp.src('src/sass/styles.sass')
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
};

function watch() {
	browserSync.init({
		server: './'
	});

	gulp.watch('./src/sass/**/*.sass', css);
	gulp.watch('./src/index.js', js);
	gulp.watch(['./index.html', './src/sass/**/*.sass', './src/index.js']).on('change', browserSync.reload);
};

exports.js = js
exports.css = css
exports.watch = watch

const build = gulp.parallel(watch);
gulp.task('default', build);