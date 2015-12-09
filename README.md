[![Build Status](https://travis-ci.org/showpad/karma-rollup-preprocessor.svg)](https://travis-ci.org/showpad/karma-rollup-preprocessor)
[![npm version](https://img.shields.io/npm/v/karma-rollup-preprocessor.svg)](https://www.npmjs.org/package/karma-rollup-preprocessor)
[![npm downloads](https://img.shields.io/npm/dm/karma-rollup-preprocessor.svg)](https://www.npmjs.org/package/karma-rollup-preprocessor)




# karma-rollup-preprocessor

> Preprocessor to bundle ES6 modules fly with [rollup](http://rollupjs.org/).

This preprocessor is mainly used to bundle your spec entry point but might be useful in other cases as well.


# Installation
npm install karma-rollup-preprocessor --save-dev


# Configuration

See [rollup wiki](https://github.com/rollup/rollup/wiki) for more details
The `rollupPreprocessor` configuration is optional. (You'll need to install more dependencies)

```js
module.exports = function (config) {
  config.set({
    preprocessors: {
      'test/main*.js': ['rollup']
    },
    rollupPreprocessor: {
      plugins: [
        require('rollup-plugin-babel')({
          presets: [
            require('babel-preset-es2015-rollup')
          ]
        })
      ]
    }
  });
};