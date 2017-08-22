'use strict'

const rollup = require('rollup')
const assign = require('object-assign')


function createPreprocessor (options, preconfig, logger) {

	const config = assign({}, options, preconfig.options)
	const log = logger.create('preprocessor.rollup')

	return (content, file, done) => {
		done(null, content)
	}
}

createPreprocessor.$inject = ['config.rollupPreprocessor', 'args', 'logger']

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
}
