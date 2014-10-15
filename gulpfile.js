// gulp modules
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	minifycss = require('gulp-minify-css'),
	livereload = require('gulp-livereload');


// public folder paths
var css    = __dirname + '/public/stylesheets',
	js     = __dirname + '/public/javascripts',
	fonts  = __dirname + '/public/fonts',
	images = __dirname + '/public/images';



// -------------- development --------------
var dev = {
	scssInit  : css + '/scss/*.scss', 		// initial scss processing
	cssDest   : css, 						// css destination
	scssWatch : css + '/**/*.scss', 		// scss watch
	cssReload : css + '/*.css', 			// live-reload watch
};


// compile scss
gulp.task('scss', function(){
	gulp.src( dev.scssInit )
		.pipe( sass({errLogToConsole: true}) )
		.pipe( gulp.dest( dev.cssDest) )
		.pipe( livereload() );
});

// watch scss
gulp.task('watch', function(){
	gulp.watch( dev.scssWatch, ['scss'] );
});


// start express
gulp.task('express', function(){
	require('./bin/www');
});


gulp.task('dev', ['scss', 'express', 'watch'] );



// -------------- dist --------------
var dist = {
	dest : __dirname + '/dist/',

	scssInit : css + '/scss/simple-hint.scss',
	cssInit : css + '/simple-hint.css'
};

// scss compile
gulp.task('dist-scss', function(){
	gulp.src( dist.scssInit )
		.pipe( sass() )
		.pipe( gulp.dest( css ) );
});

// simple-hint css
gulp.task('dist-css', function(){
	gulp.src( dist.cssInit )
		.pipe( gulp.dest( dist.dest ) )
		.pipe( rename({ suffix: '.min'}) )
		.pipe( minifycss() )
		.pipe( gulp.dest( dist.dest ) );

});


gulp.task('dist', ['dist-scss', 'dist-css'], function(){
	console.log( 'successfully set up dist' );
});