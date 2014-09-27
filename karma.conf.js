module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'test/bower_components/angular/angular.js',
      'test/bower_components/angular-route/angular-route.js',
      'test/bower_components/angular-mocks/angular-mocks.js',
      'test/**/*.js',
      'utils/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
