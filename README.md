[![Build Status](https://travis-ci.org/showpad/karma-rollup-preprocessor.svg)](https://travis-ci.org/showpad/karma-rollup-preprocessor)
[![npm version](https://img.shields.io/npm/v/karma-rollup-preprocessor.svg)](https://www.npmjs.org/package/karma-rollup-preprocessor)
[![npm downloads](https://img.shields.io/npm/dm/karma-rollup-preprocessor.svg)](https://www.npmjs.org/package/karma-rollup-preprocessor)




# karma-rollup-preprocessor

> Preprocessor to bundle ES6 modules fly with [rollup](http://rollupjs.org/).

This preprocessor is mainly used to bundle your spec entry point but might be useful in other cases as well.


# Installation
npm install karma-rollup-preprocessor --save-dev


# Configuration

The `rollupPreprocessor` configuration is optional. (You'll need to install more dependencies). It takes two keys: `rollup` and
 `bundle`.

`rollup` is the configuration object for `rollup` (See [rollup.rollup](https://github.com/rollup/rollup/wiki/JavaScript-API#rolluprollup-options-) for more details).

`bundle` is the configuration object used when generating the bundle  (See [bundle.generate](https://github.com/rollup/rollup/wiki/JavaScript-API#bundlegenerate-options-) for more details)
*Notice* this is preprocessor and does not write a file or return the bundle, only the content of the processed file gets changed.
So when adding the `sourceMaps` options, `inline` is the only logical value.


## Example

```js
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