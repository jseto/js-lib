'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var server = require( path.server + 'server.js' );
var browserSync = require( 'browser-sync' );

gulp.task('serve', function(){
	server.start(project.port);
});

gulp.task('serve:stop', function(){
	forever.stop( path.server + 'server.js' );
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: path.client,
            routes: {
            	'/lib': path.lib
            }
        },
        open: false,
        port: project.port
    });
});

gulp.task('serve:browserSync', ['browser-sync'], function(){
	gulp.watch(	project.watch.servedFiles, browserSync.reload );
});

gulp.task('develop', ['serve:browserSync', 'watch:test:unit']);
gulp.task('develop:quiet', ['serve:browserSync', 'watch:test:unit:quiet']);