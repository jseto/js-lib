'use strict';

var project = require('../project.conf.js');

module.exports = function(config){
  config.set({

    basePath : project.path.base,

    exclude : [
      project.path.test + '**/*.conf.js',
      project.path.test + '**/*e2e-spec.js',
      project.path.test + '**/*pageobject.js'
    ],

    files : project.test.unit.files,
 
    preprocessors: {
      'test/**/*.html': 'ng-html2js'
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-beep-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
