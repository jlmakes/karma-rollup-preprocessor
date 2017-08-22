'use strict'

const rollup = require('rollup')
const assign = require('object-assign')


function createPreprocessor (options, preconfig) {

	const config = assign({}, options, preconfig.options)

	return (content, file, done) => {
		done(null, content)
	}

}

createPreprocessor.$inject = ['config.rollupPreprocessor', 'args']

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
}
