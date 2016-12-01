# karma-rollup-preprocessor
Karma preprocessor to bundle ES6 modules using [Rollup](http://rollupjs.org/).

[![Travis CI][travis-badge]][travis-url]
[![NPM downloads][downloads-badge]][downloads-url]
[![Version][version-badge]][version-url]
[![License MIT][license-badge]][license-url]

## Installation
```bash
npm install karma-rollup-preprocessor --save-dev
```


## Configuration
All the options detailed in the [Rollup Documentation](https://github.com/rollup/rollup/wiki/JavaScript-API) can be passed to `rollupPreprocessor`.

### Example
Below is a well-founded recommendation using the [Bublé](https://buble.surge.sh) ES2015 transpiler:

```js
// karma.conf.js
module.exports = function (config) {
	config.set({

		files: [
			'src/**/*.js',
			'test/**/*.spec.js',
		],

		preprocessors: {
			'src/**/*.js': ['rollup'],
			'test/**/*.spec.js': ['rollup'],
		},

		rollupPreprocessor: {
			plugins: [
				require('rollup-plugin-buble')(),
			],
			format: 'iife',              // helps prevent naming collisions
			moduleName: '<your_project>' // required for 'iife' format
			sourceMap: 'inline',         // sensible for testing
		},
	});
};
```

<p align="center">From the ![heart](http://i.imgur.com/oXJmdtz.gif) of [Julian Lloyd](https://twitter.com/jlmakes) © 2016<p>

[travis-badge]: https://img.shields.io/travis/jlmakes/karma-rollup-preprocessor.svg
[travis-url]: https://travis-ci.org/jlmakes/karma-rollup-preprocessor
[downloads-badge]: https://img.shields.io/npm/dm/karma-rollup-preprocessor.svg?style=flat
[downloads-url]: https://npmjs.org/package/karma-rollup-preprocessor
[version-badge]: https://img.shields.io/npm/v/karma-rollup-preprocessor.svg
[version-url]: https://www.npmjs.org/package/karma-rollup-preprocessor
[license-badge]: https://img.shields.io/badge/license-MIT-1283c3.svg
[license-url]: https://opensource.org/licenses/MIT
