<p align="center"><img width="200"src="https://jlmak.es/logos/png/karma-rollup-preprocessor.png?v=1"></p>
<p align="center">Karma preprocessor to bundle ES6 modules using <a href="http://rollupjs.org/">Rollup</a>.</p>
<p align="center">
	<a href="https://travis-ci.org/jlmakes/karma-rollup-preprocessor">
		<img src="https://img.shields.io/travis/jlmakes/karma-rollup-preprocessor.svg" alt="Build Status">
	</a>
	<a href="https://david-dm.org/jlmakes/karma-rollup-preprocessor">
		<img src="https://img.shields.io/david/jlmakes/karma-rollup-preprocessor.svg" alt="Dependency Status">
	</a>
	<a href="https://www.npmjs.com/package/karma-rollup-preprocessor">
		<img src="https://img.shields.io/npm/dm/karma-rollup-preprocessor.svg" alt="Downloads">
	</a>
	<a href="https://www.npmjs.com/package/karma-rollup-preprocessor">
		<img src="https://img.shields.io/npm/v/karma-rollup-preprocessor.svg" alt="Version">
	</a>
	<a href="https://opensource.org/licenses/MIT">
		<img src="https://img.shields.io/npm/l/karma-rollup-preprocessor.svg" alt="License">
	</a>
</p>

<br>

## Features
- Rebundles your files when watched dependencies change
- Caches bundle output for improved performance
- Maintained with ![heart](http://i.imgur.com/oXJmdtz.gif) by [@jlmakes](https://twitter.com/jlmakes)

<br>

## Installation
```bash
npm install karma-rollup-preprocessor --save-dev
```

<br>

## Configuration
All the options detailed in the [Rollup Documentation](https://github.com/rollup/rollup/wiki/JavaScript-API) can be passed to `rollupPreprocessor`.

### Example
Below is a well-founded recommendation using the [Bublé](https://buble.surge.sh) ES2015 transpiler:

```js
// karma.conf.js
module.exports = function (config) {
	config.set({

		files: [
			// watch src files for changes but
			// don't load them into the browser.
			{ pattern: 'src/**/*.js', included: false },
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

<br>

## Support

Supports all Rollup plug-ins, and works on Node `0.12.x` and up. Happy bundling!
