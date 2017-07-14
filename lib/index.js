'use strict'

const fs = require('fs')
const rollup = require('rollup').rollup
const _ = require('lodash')


function createPreprocessor (customConfig, baseConfig, logger) {
	const dependencyMap = new Map()
	const staleDependants = new Set()
	const log = logger.create('preprocessor.rollup')

	let cache

	/**
	 * Manually update the modified and accessed timestamps
	 * of all dependants marked by changed dependencies.
	 */
	const recompileDependants = _.debounce(() => {
		const now = Date.now()
		for (const dependant of staleDependants.values()) {
			fs.utimes(dependant, now, now, () => {
				log.debug('Recompiling dependant %s', dependant)
			})
		}
		staleDependants.clear()
	}, 50)


	const config = _.assign({}, baseConfig, (customConfig || {}).options)

	function preprocess (content, file, done) {
		log.debug('Processing %s', file.originalPath)

		try {
			config.entry = file.originalPath
			config.cache = cache

			rollup(config).then(bundle => {

				/**
				 * Map all dependencies of the current file
				 */
				file.dependencies = bundle.modules
					.map(module => module.id)
					.filter(id => id !== file.originalPath)

				dependencyMap.set(file.originalPath, file.dependencies)

				/**
				 * Check all dependants to see if the current file
				 * is one of their dependencies, marking those that
				 * match as stale and triggering their recompilation.
				 */
				for (const entry of dependencyMap.entries()) {
					const dependant = entry[0]
					const dependencies = entry[1]
					if (dependencies.indexOf(file.originalPath) !== -1) {
						staleDependants.add(dependant)
						recompileDependants()
					}
				}

				// Return the promise so that errors will be handled by the `catch` statement below.
				return Promise.resolve(bundle.generate(config)).then((generated) => {
					const processed = (config.sourceMap === 'inline')
						? generated.code + `\n//# sourceMappingURL=${generated.map.toUrl()}\n`
						: generated.code

					cache = bundle
					done(null, processed)
				})
			})
			.catch(error => {
				log.error('Failed to process %s\n\n%s\n', file.originalPath, error.message)
				done(error, null)
			})

		} catch (exception) {
			log.error('Exception processing %s\n\n%s\n', file.originalPath, exception.message)
			done(exception, null)
		}
	}

	return preprocess
}

createPreprocessor.$inject = ['args', 'config.rollupPreprocessor', 'logger']

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
}
