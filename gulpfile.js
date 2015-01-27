'use strict';

var gulp = require('gulp');

var project = require('./project.conf.js');
var path = project.path;

require('require-dir')('./gulp');

var del = require('del');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');

gulp.task('default', ['develop']);

gulp.task('pristine', ['clean'], function( done ){
    del([
        path.bower + '**',
        'node_modules/**'
    ], function(){
        var git = spawn('git', ['clean', '-d', '-fx']);
        var stdout='';
        var stderr='';

        git.stdout.setEncoding('utf8');
        git.stdout.on('data', function (data) {
            stdout += data;
            gutil.log(data);
        });

        git.stderr.setEncoding('utf8');
        git.stderr.on('data', function (data) {
            stderr += data;
            gutil.log(gutil.colors.red(data));
            gutil.beep();
        });

        git.on('close', function(code) {
            gutil.log('Done with exit code', code);
            done();
        });        
    });
});

gulp.task('res',function(){
    console.log(process.argv.slice(3)[0])
});