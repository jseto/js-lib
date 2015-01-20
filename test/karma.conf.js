'use strict';

module.exports = function(config){
  config.set({

    basePath : '../',

    exclude : [
      '**/*.conf.js',
      'test/**/*e2e-spec.js',
      'test/**/*pageobject.js'
    ],

    files : [
      'demo/bower_components/jquery/dist/jquery.js',
      'demo/bower_components/bootstrap/dist/js/bootstrap.js',
      'demo/bower_components/angular/angular.js',
      'demo/bower_components/angular-mocks/angular-mocks.js',
      'demo/bower_components/angular-messages/angular-messages.js',
      'demo/bower_components/jseto-bootstrap-datepicker/js/bootstrap-datepicker.js',
      'test/**/*.js',
      'lib/**/*.js',
      { pattern:'demo/locale/*.json', watched: true, served: true, included: false},
      'test/**/*.html'
    ],

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
