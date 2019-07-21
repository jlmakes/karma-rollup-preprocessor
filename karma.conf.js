module.exports = function(config) {
	config.set({
		plugins: [
			'karma-jasmine',
			'karma-mocha-reporter',
			'karma-chrome-launcher',
			require('./lib'),
		],

		frameworks: ['jasmine'],
		reporters: ['mocha'],
		browsers: ['ChromeHeadless'],

		logLevel: config.LOG_INFO, // disable > error > warn > info > debug
		captureTimeout: 60000,
		autoWatch: true,
		singleRun: true,
		colors: true,
		port: 9876,

		basePath: '',
		files: [
			{ pattern: 'test/t1.js', watched: false },
			{ pattern: 'test/t2.js', watched: false },
			{ pattern: 'test/t3.js', watched: false },
			{ pattern: 'test/t4.ts', watched: false },
		],
		exclude: [],

		preprocessors: {
			'test/t1.js': ['rollup'],
			'test/t2.js': ['rollup'],
			'test/t3.js': ['rollupNode'],
			'test/t4.ts': ['rollupNodeTypescript'],
		},

		rollupPreprocessor: {
			output: {
				name: 'lib',
				format: 'iife',
				sourcemap: 'inline',
			},
			plugins: [require('rollup-plugin-buble')()],
		},

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
			rollupNodeTypescript: {
				base: 'rollup',
				options: {
					plugins: [
						require('rollup-plugin-node-resolve')({
							extensions: ['.js', '.ts'],
						}),
						require('rollup-plugin-commonjs')({
							include: 'node_modules/**',
							extensions: ['.js', '.ts'],
						}),
						require('rollup-plugin-babel')({
							exclude: 'node_modules/**',
							extensions: ['.js', '.ts'],
						}),
					],
				},
			},
		},
	})
}
