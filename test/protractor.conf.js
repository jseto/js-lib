exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '**/*e2e-spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
//    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    // If true, display spec names.
    isVerbose: false,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000
  },
};
