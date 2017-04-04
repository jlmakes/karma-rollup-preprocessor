// Karma configuration
// Generated on Wed Dec 09 2015 16:06:35 GMT+0100 (CET)
module.exports = function (config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',


		// frameworks to use
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			'test/main.js',
			'test/main-node.js',
		],


		// add a preprocessor for the main test file
		preprocessors: {
			'test/main.js': ['rollup'],
			'test/main-node.js': ['rollupNode'],
		},


		// specify the config for the rollup pre-processor: run babel plugin on the code
		rollupPreprocessor: {
			format: 'iife',
			plugins: [
				require('rollup-plugin-buble')(),
			],
		},

		// specify a custom config for the rollup pre-processor:
		// run node-resolve + commonjs + buble plugin on the code
		customPreprocessors: {
			rollupNode: {
				base: 'rollup',
				options: {
					plugins: [
						require('rollup-plugin-node-resolve')(),
						require('rollup-plugin-commonjs')(),
						require('rollup-plugin-buble')(),
					],
				},
			},
		},

		// load necessary plugins
		plugins: [
			'karma-jasmine',
			'karma-phantomjs-launcher',
			require('./lib'),
		],


		// list of files to exclude
		exclude: [],


		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
		// config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
		browsers: ['PhantomJS'],


		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true,
	})
}
