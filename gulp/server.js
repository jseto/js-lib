'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var browserSync = require( 'browser-sync' );

gulp.task('server:start', ['browser-sync']);

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: path.client,
            routes: {
            	'/lib': path.lib,
            	'/docs': path.docs,
            	'/docs/api': path.docs,
            }
        },
        open: false,
        port: project.port
    });
});

gulp.task('server:reload', ['browser-sync'], function(){
	gulp.watch(	project.watch.servedFiles, browserSync.reload );
});

gulp.task('develop', ['server:reload', 'watch:test:unit']);
gulp.task('develop:quiet', ['server:reload', 'watch:test:unit:quiet']);

gulp.task('develop:docs', ['server:reload', 'watch:docs']);