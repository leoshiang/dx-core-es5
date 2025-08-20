// Karma configuration
// Generated on Wed Dec 19 2018 23:05:18 GMT+0800 (GMT+08:00)

module.exports = function (config) {
  config.set({
    frameworks: ['qunit', 'fixture'],
    plugins: [
      'karma-qunit',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-fixture',
      'karma-html2js-preprocessor',
      'karma-json-fixtures-preprocessor'
    ],
    files: [
      'tests/fixtures/DataBinding.fixture.html',
      'source/core/Namespace.js',
      'source/core/Dolphin.js',
      'source/core/Polyfill.js',
      'source/core/Exceptions.js',
      'source/core/Type.js',
      'source/core/Assert.js',
      'source/core/Observable.js',
      'source/core/StrUtils.js',
      'source/core/Log.js',
      'source/core/DataBinding.js',
      'source/core/AutoMapper.js',
      'source/collections/Bits.js',
      'source/collections/Collection.js',
      'source/collections/Map.js',
      'source/collections/Strings.js',
      'source/collections/Stack.js',
      'source/html/Html.js',
      'source/html/Element.js',
      'source/html/Tags.js',
      'source/datetime/TimeUnit.js',
      'source/datetime/Period.js',
      'tests/collections/Bits.test.js',
      'tests/collections/Map.test.js',
      'tests/collections/Stack.test.js',
      'tests/core/Assert.test.js',
      'tests/core/AutoMapper.test.js',
      'tests/core/DataBinding.test.js',
      'tests/core/Namespace.test.js',
      'tests/core/Observable.test.js',
      'tests/core/StrUtils.test.js',
      'tests/core/Type.test.js',
      'tests/datetime/Period.test.js',
      'tests/datetime/TimeUnit.test.js',
      'tests/html/Element.test.js',
      'tests/html/Tag.test.js'
    ],
    exclude: [],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      '**/*.html': ['html2js'],
      '**/*.json': ['json_fixtures'],
      'source/collections/*.js': ['coverage'],
      'source/core/*.js': ['coverage'],
      'source/datetime/*.js': ['coverage'],
      'source/diagnostics/*.js': ['coverage'],
      'source/html/*.js': ['coverage']
    },
    jsonFixturesPreprocessor: {
      variableName: '__json__'
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'reports/coverage-lcov/'
    },
    basePath: '.',
    port: 9999,
    colors: true,
    logLevel: config.LOG_DISABLE,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
    failOnEmptyTestSuite: false
  })
}
