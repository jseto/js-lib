'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var server = require( path.server + 'server.js' );
var runSequence = require( 'run-sequence' );

var karma = require('karma').server;
var protractorInst = require('gulp-protractor').protractor;
var protractorQA = require('gulp-protractor-qa');

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

gulp.task('test:e2e', function(done){
	server.start( project.port );
	gulp.src( 
		project.test.e2e.files 
	)
	.pipe( protractorInst({
        configFile: path.test + 'protractor.conf.js',
    }))
	.on('error', function(e) { 
		server.close();
		throw e; 
	})
	.on('end', function(){
		server.stop();
		done();
		process.exit();
	});
});

gulp.task( 'test', function( done ){
	runSequence( 'test:unit', 'test:e2e', done );
});

gulp.task('protractor-qa', function() {
	console.error('************************* THIS TASK IS NOT WORKING PROPERLY*****');
	//Presumably, there is a bug in protractor-qa
	protractorQA.init({
		testSrc : [
			path.test + '**/*e2e-spec.js',
			path.test + '**/*pageobject.js'
		],
		viewSrc : path.client + 'index.html'
	});
});

