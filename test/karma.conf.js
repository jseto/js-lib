module.exports = function(config){
  config.set({

    basePath : '../',

    exclude : [
      '**/*.conf.js'
    ],

    files : [
      'demo/bower_components/angular/angular.js',
      'demo/bower_components/angular-mocks/angular-mocks.js',
      'demo/bower_components/jquery/dist/jquery.js',
      'test/**/*.js',
      'lib/**/*.js',
      { pattern:'demo/locale/*.json', watched: true, served: true, included: false},
      'test/**/*.html'
    ],

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
