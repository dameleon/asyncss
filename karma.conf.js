// Karma configuration
// Generated on Wed Dec 31 2014 01:54:50 GMT+0900 (JST)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'fixture', 'browserify'],
    files: [
      'spec/fixtures/**/*',
      'src/**/*.js',
    ],
    exclude: [
    ],
    preprocessors: {
      '**/*.html'   : 'html2js',
      '/**/*.browserify': 'browserify'
    },
    browserify: {
      debug: true,
      files: [
        'spec/**/*.js'
      ],
      transform: [
        'espowerify'
      ]
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
