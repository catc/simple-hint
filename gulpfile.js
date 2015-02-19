// gulp modules
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	minifycss = require('gulp-minify-css'),
	
	jade = require('gulp-jade')
	livereload = require('gulp-livereload')

	;


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
});

// watch scss
gulp.task('watch', function(){
	gulp.watch( dev.scssWatch, ['scss'] );

	// watch css
	livereload.listen();
	gulp.watch( dev.cssReload ).on('change', livereload.changed);
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
		.pipe( gulp.dest( dist.dest + '/scss/' ) )
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


// -------------- github page --------------
var gh = {
	dest : __dirname + '/gh-pages/',

	jadeInit : 'views/index.jade',

	get cssDest (){ return this.dest + '/stylesheets/'; },
	get jsDest (){ return this.dest + '/javascripts/'; },
	get fontDest (){ return this.dest + '/fonts/'; },
	get imageDest (){ return this.dest + '/images/'; },
};


// jade to index.html
gulp.task('gh-jade', function(){
	gulp.src( gh.jadeInit )
		.pipe( jade() )
		.pipe( gulp.dest( gh.dest ) );
});

// css, js, images
gulp.task('gh-public', function(){
	gulp.src([
			'public/*/*',
			'!public/stylesheets/scss/'
		])
		.pipe( gulp.dest( gh.dest ) )
	;
});


gulp.task('gh-page', ['gh-jade', 'gh-public'], function(){
	console.log( 'successfully updated github page' );
});