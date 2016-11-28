# karma-rollup-preprocessor

[![Travis CI][travis-badge]][travis-url]
[![NPM downloads][downloads-badge]][downloads-url]
[![Version][version-badge]][version-url]
[![License MIT][license-badge]][license-url]

> Preprocessor to bundle ES6 modules fly with [rollup](http://rollupjs.org/).

This preprocessor is mainly used to bundle your spec entry point but might be useful in other cases as well.


# Installation
```bash
npm install karma-rollup-preprocessor --save-dev
```


# Configuration
The `rollupPreprocessor` configuration is optional. (You'll need to install more dependencies). It takes two keys: `rollup` and
 `bundle`.

`rollup` is the configuration object for `rollup` (See [rollup.rollup](https://github.com/rollup/rollup/wiki/JavaScript-API#rolluprollup-options-) for more details).

`bundle` is the configuration object used when generating the bundle  (See [bundle.generate](https://github.com/rollup/rollup/wiki/JavaScript-API#bundlegenerate-options-) for more details)
*Notice* this is preprocessor and does not write a file or return the bundle, only the content of the processed file gets changed.
So when adding the `sourceMaps` options, `inline` is the only logical value.


## Example
```js
// karma.conf.js
module.exports = function (config) {
  config.set({
    preprocessors: {
      'test/main.js': ['rollup']
    },
    rollupPreprocessor: {
      rollup: {
        plugins: [
          require('rollup-plugin-babel')({
            presets: [
              require('babel-preset-es2015-rollup')
            ]
          })
        ]
      },
      bundle: {
        sourceMap: 'inline'
      }
    }
  });
};
```
[travis-badge]: https://img.shields.io/travis/jlmakes/karma-rollup-preprocessor.svg
[travis-url]: https://travis-ci.org/jlmakes/karma-rollup-preprocessor
[downloads-badge]: https://img.shields.io/npm/dm/karma-rollup-preprocessor.svg?style=flat
[downloads-url]: https://npmjs.org/package/karma-rollup-preprocessor
[version-badge]: https://img.shields.io/npm/v/karma-rollup-preprocessor.svg
[version-url]: https://www.npmjs.org/package/karma-rollup-preprocessor
[license-badge]: https://img.shields.io/badge/license-MIT-1283c3.svg
[license-url]: https://opensource.org/licenses/MIT
