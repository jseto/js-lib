'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

//var server = require( path.server + 'server.js' );
var runSequence = require( 'run-sequence' );
var browserSync = require( 'browser-sync' );
var karma = require('karma').server;
var protractorInst = require('gulp-protractor');
//var protractorQA = require('gulp-protractor-qa');
var gutil = require('gulp-util');

gulp.task('test:unit', function (done) {
	karma.start({
		configFile: path.test + 'karma.conf.js',
		singleRun: true
	}, done);
});

gulp.task('watch:test:unit:quiet', function (done) {
	karma.start({
		configFile: path.test + 'karma.conf.js',
	}, done);
});

gulp.task('watch:test:unit', function (done) {
	karma.start({
		configFile: path.test + 'karma.conf.js',
		reporters: [
			'beep',
			'progress'
		]
	}, done);
});

gulp.task('test:e2e', ['browser-sync'], function(done){
	gulp.src( 
		project.test.e2e.files 
	)
	.pipe( protractorInst.protractor({
		configFile: path.test + 'protractor.conf.js',
	}))
	.on('error', function(e) { 
		gutil.beep();
		browserSync.exit();
		throw e; 
	})
	.on('end', function(){
		browserSync.exit();
		done();
	});
});

gulp.task( 'test', function( done ){
	runSequence( 'test:unit', 'test:e2e', done );
});

// Downloads the selenium webdriver
gulp.task('webdriver-update', protractorInst.webdriver_update);

gulp.task('protractor-qa', function() {
	console.error('************************* THIS TASK IS NOT WORKING PROPERLY*****');
	//Presumably, there is a bug in protractor-qa
	// protractorQA.init({
	// 	testSrc : [
	// 		path.test + '**/*e2e-spec.js',
	// 		path.test + '**/*pageobject.js'
	// 	],
	// 	viewSrc : path.client + 'index.html'
	// });
});
