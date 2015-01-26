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

/*
//    "start": "forever start -m 1 demo/server.js",
//    "stop": "forever stop demo/server.js",
//    "test": "npm run test:unit && npm run test:e2e",
//    "test:unit": "karma start test/karma.conf.js --single-run",
//    "pretest:e2e": "npm start",
//    "test:e2e": "protractor test/protractor.conf.js",
//    "posttest:e2e": "npm stop",
    "update-index-async": "node -e \"require('shelljs/global'); sed('-i', /\\/\\/@@NG_LOADER_START@@[\\s\\S]*\\/\\/@@NG_LOADER_END@@/, '//@@NG_LOADER_START@@\\n' + sed(/sourceMappingURL=angular-loader.min.js.map/,'sourceMappingURL=bower_components/angular-loader/angular-loader.min.js.map','app/bower_components/angular-loader/angular-loader.min.js') + '\\n//@@NG_LOADER_END@@', 'app/index-async.html');\"",
    "clean": "rimraf demo/bower_components && rimraf node_modules && git clean -d -fx",
//    "watch:test:unit": "karma start test/karma.conf.js",
//    "watch:test:unit:beep": "karma start test/karma.conf.js --reporters beep,progress",
//    "dev": "parallelshell \"node demo/server.js\" \"npm run watch:test:unit\"",
//    "dev:beep": "parallelshell \"node demo/server.js\" \"npm run watch:test:unit:beep\""
*/