'use strict'

const path = require('path')
const rollup = require('rollup').rollup
const assign = require('object-assign')


function createPreprocessor (options, preconfig, basePath, logger) {

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
				const location = path.relative(basePath, file.path)
				log.error('Error processing “%s”\n\n%s\n', location, error.message)
				done(error, null)
			})
	}
}

createPreprocessor.$inject = ['config.rollupPreprocessor', 'args', 'config.basePath', 'logger']

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
}
