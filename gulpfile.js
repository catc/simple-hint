const gulp = require('gulp');
const connect = require('gulp-connect');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const header = require('gulp-header');

const package = require('./package.json');
const banner = `/*! Simple Hint v${package.version} | Copyright (c) 2014 Catalin Covic | https://github.com/catc */\n`;

const paths = {
	css: {
		src: 'src/simple-hint.scss',
		style: 'docs/css/scss/**/*.scss'
	}
};

// dev
gulp.task('server', function(){
	connect.server({
		root: 'docs',
		port: 3400,
		livereload: true
	});
})
gulp.task('pug', function(){
	return gulp.src('docs/index.pug')
		.pipe(pug({

		}))
		.pipe(gulp.dest('docs/'))
		.pipe( connect.reload() )
})
gulp.task('sass-src', function(){
	return gulp.src(paths.css.src)
		.pipe( sass({errLogToConsole: true}) )
		.pipe( gulp.dest('docs/css') )
		.pipe( connect.reload() )
})
gulp.task('sass-doc-style', function(){
	return gulp.src('docs/css/scss/style.scss')
		.pipe( sass({errLogToConsole: true}) )
		.pipe( gulp.dest('docs/css') )
		.pipe( connect.reload() )
})
gulp.task('watch', ['pug'], function(){
	// pug
	gulp.watch('docs/index.pug', ['pug'])

	// sass
	gulp.watch(paths.css.src, ['sass-src'])
	gulp.watch(paths.css.style, ['sass-doc-style'])
})

gulp.task('dev', ['server', 'watch'])

// prod
gulp.task('build', function(){
	return gulp.src(paths.css.src)
		.pipe( sass({errLogToConsole: true}) )
		.pipe( header(banner) )
		.pipe( gulp.dest('dist') )
		.pipe( rename({ suffix: '.min'}) )
		.pipe( clean() )
		.pipe( gulp.dest('dist') )
})