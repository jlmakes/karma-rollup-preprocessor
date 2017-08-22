'use strict'

const rollup = require('rollup')
const assign = require('object-assign')


function createPreprocessor (options, preconfig, logger) {

	const log = logger.create('preprocessor.rollup')

	let cache

	return (content, file, done) => {
		const config = assign({}, options, preconfig.options,
			{
				input: file.path,
				cache,
			}
		)
		done(null, content)
	}
}

createPreprocessor.$inject = ['config.rollupPreprocessor', 'args', 'logger']

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
}
