'use strict'

const rollup = require('rollup').rollup
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

		rollup(config)
			.then(bundle => {
				cache = bundle
				return bundle.generate(config)
			})
			.then(generated => {
				let output = generated.code
				if (config.sourcemap === 'inline') {
					output += `\n//# sourceMappingURL=${generated.map.toUrl()}\n`
				}
				done(null, output)
			})
			.catch(error => {
				log.error('Error processing %s\n\n%s\n', file.path, error.message)
				done(error, null)
			})
	}
}

createPreprocessor.$inject = ['config.rollupPreprocessor', 'args', 'logger']

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
}
