module.exports = function(config){
  config.set({

    basePath : './',

    exclude : [
      '**/*.conf.js'
    ],

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jquery/dist/jquery.js',
      'test/**/*.js',
      'jsWidgets/**/*.js',
      'locale/**/*.js',
      'utils/**/*.js',
      { pattern:'test/locale/*.json', watched: true, served: true, included: false},
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
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
