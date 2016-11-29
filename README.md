# karma-rollup-preprocessor
Karma preprocessor to bundle ES6 modules using [Rollup](http://rollupjs.org/).

[![Travis CI][travis-badge]][travis-url]
[![NPM downloads][downloads-badge]][downloads-url]
[![Version][version-badge]][version-url]
[![License MIT][license-badge]][license-url]

# Installation
```bash
npm install karma-rollup-preprocessor --save-dev
```


# Configuration
The `rollupPreprocessor` configuration is optional. It takes two keys: `rollup` and `bundle`.

- `rollup` - basic configuration (See [rollup.rollup](https://github.com/rollup/rollup/wiki/JavaScript-API#rolluprollup-options))

- `bundle` - options used during bundle generation  (See [bundle.generate](https://github.com/rollup/rollup/wiki/JavaScript-API#bundlegenerate-options))

>**Note:** This is preprocessor, and does not write to a file or return any bundle.
>So when adding the `sourceMaps` options, `inline` is the only logical value.


## Example
```js
// karma.conf.js

const babel = require('rollup-plugin-babel');
const es2015 = require('babel-preset-es2015-rollup');

module.exports = function (config) {
	config.set({
		preprocessors: {
			'test/main.js': ['rollup'],
		},
		rollupPreprocessor: {
			rollup: {
				plugins: [
					babel({
						presets: [es2015],
					}),
				],
			},
			bundle: {
				sourceMap: 'inline',
			},
		},
	});
};
```

***

From the ![heart](http://i.imgur.com/oXJmdtz.gif) of [Julian Lloyd](https://twitter.com/jlmakes) © 2016

[travis-badge]: https://img.shields.io/travis/jlmakes/karma-rollup-preprocessor.svg
[travis-url]: https://travis-ci.org/jlmakes/karma-rollup-preprocessor
[downloads-badge]: https://img.shields.io/npm/dm/karma-rollup-preprocessor.svg?style=flat
[downloads-url]: https://npmjs.org/package/karma-rollup-preprocessor
[version-badge]: https://img.shields.io/npm/v/karma-rollup-preprocessor.svg
[version-url]: https://www.npmjs.org/package/karma-rollup-preprocessor
[license-badge]: https://img.shields.io/badge/license-MIT-1283c3.svg
[license-url]: https://opensource.org/licenses/MIT
