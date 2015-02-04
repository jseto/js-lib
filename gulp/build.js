'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var browserSync = require( 'browser-sync' );
var del = require('del');
// var docs = require('gulp-ngdocs'); //removed until stable release
var gutil = require('gulp-util');

gulp.task('clean', [ 'clean:docs', 'clean:coverage' ]);

gulp.task('clean:docs', function( done ){
	del( [ path.docs + '**'], done );
});

gulp.task('clean:coverage', function(done){
	del( [ path.coverage + '**'], done );
});


/*  removed until stable release
gulp.task('docs', ['clean:docs'], function(){
*///	return gulp.src( path.lib + '**/*.js' )
/*		.pipe( docs.process({
			scripts: [
				path.bower + 'angular/angular.min.js',
				path.bower + 'angular/angular.min.js.map',
				path.bower + 'angular-animate/angular-animate.min.js',
				path.bower + 'angular-animate/angular-animate.min.js.map',
*///				path.lib + '**/*.js'
/*			]
		}))
		.pipe( gulp.dest( path.docs ) )
		.on('end', function(){
			gutil.log( gutil.colors.green( 'Rebuild docs successfully done.' ) );
			browserSync.reload();
		})
		.on('error', function( error ){
			gutil.log( gutil.colors.red( 'Rebuild docs failed.' ), error );
			gutil.beep();
			throw error;
		});
});

gulp.task('watch:docs', function(){
	gulp.watch(	project.watch.servedFiles, ['docs'] );
});
*/