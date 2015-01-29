'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var browserSync = require( 'browser-sync' );

gulp.task('server', ['browser-sync']);

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

gulp.task('develop', ['serve:browser-sync', 'watch:test:unit']);
gulp.task('develop:quiet', ['serve:browser-sync', 'watch:test:unit:quiet']);

gulp.task('develop:docs', ['browser-sync', 'watch:docs']);