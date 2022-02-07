# `karma-rollup-preprocessor`

Karma preprocessor to bundle ES modules using Rollup.

<p>
	<a href="https://travis-ci.org/jlmakes/karma-rollup-preprocessor">
		<img src="https://img.shields.io/travis/jlmakes/karma-rollup-preprocessor?color=black&style=for-the-badge" alt="Build Status">
	</a>
	<a href="https://www.npmjs.com/package/karma-rollup-preprocessor">
		<img src="https://img.shields.io/npm/dm/karma-rollup-preprocessor?color=black&style=for-the-badge" alt="Downloads">
	</a>
	<a href="https://www.npmjs.com/package/karma-rollup-preprocessor">
		<img src="https://img.shields.io/npm/v/karma-rollup-preprocessor?color=black&style=for-the-badge" alt="Version">
	</a>
	<a href="https://opensource.org/licenses/MIT">
		<img src="https://img.shields.io/badge/license-MIT-blue?color=black&style=for-the-badge" alt="MIT License">
	</a>
</p>

<br>

## Installation

```bash
npm install karma-rollup-preprocessor
```

<br>

## Configuration

All the options detailed in the [Rollup Documentation](https://github.com/rollup/rollup/wiki/JavaScript-API) can be passed to `rollupPreprocessor`.

### Standard

Below is a well-founded recommendation using the [Bublé](https://buble.surge.sh) ES2015 transpiler:

```js
// karma.conf.js
module.exports = function (config) {
	config.set({
		files: [
			/**
			 * Make sure to disable Karma’s file watcher
			 * because the preprocessor will use its own.
			 */
			{ pattern: 'test/**/*.spec.js', watched: false },
		],

		preprocessors: {
			'test/**/*.spec.js': ['rollup'],
		},

		rollupPreprocessor: {
			/**
			 * This is just a normal Rollup config object,
			 * except that `input` is handled for you.
			 */
			plugins: [require('rollup-plugin-buble')()],
			output: {
				format: 'iife', // Helps prevent naming collisions.
				name: '<your_project>', // Required for 'iife' format.
				sourcemap: 'inline', // Sensible for testing.
			},
		},
	})
}
```

<br>

### Configured Preprocessors

Below shows an example where [configured preprocessors](http://karma-runner.github.io/1.0/config/preprocessors.html) can be very helpful:

```js
// karma.conf.js
module.exports = function (config) {
	config.set({
		files: [{ pattern: 'test/**/*.spec.js', watched: false }],

		preprocessors: {
			'test/buble/**/*.spec.js': ['rollup'],
			'test/babel/**/*.spec.js': ['rollupBabel'],
		},

		rollupPreprocessor: {
			plugins: [require('rollup-plugin-buble')()],
			output: {
				format: 'iife',
				name: '<your_project>',
				sourcemap: 'inline',
			},
		},

		customPreprocessors: {
			/**
			 * Clones the base preprocessor, but overwrites
			 * its options with those defined below...
			 */
			rollupBabel: {
				base: 'rollup',
				options: {
					// In this case, to use a different transpiler:
					plugins: [require('rollup-plugin-babel')()],
				},
			},
		},
	})
}
```

Happy bundling! ![heart](http://i.imgur.com/oXJmdtz.gif)
