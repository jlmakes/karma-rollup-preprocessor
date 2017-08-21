'use strict'

const fs = require('fs')
const rollup = require('rollup')
const _ = require('lodash')
const semver = require('semver')


function createPreprocessor (customConfig, baseConfig, logger) {
	const dependencyMap = new Map()
	const staleDependants = new Set()
	const log = logger.create('preprocessor.rollup')

	let cache
	let buffer

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
			config.cache = cache

			// The `entry` has been deprecated with rollup 0.48.X, but it has to be
			// used to support previous version of rollup and other rollup plugins (such
			// as `rollup-plugin-commonjs`).
			config.entry = file.originalPath

			// The `input` option has been added with rollup 0.48.X, replacing the `entry` option.
			if (rollup.VERSION && semver.gte(rollup.VERSION, '0.48.0')) {
				config.input = file.originalPath
			}

			rollup.rollup(config).then(bundle => {

				buffer = bundle

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

				return bundle.generate(config)
			})
			.then(generated => {
				const sourceMap = config.sourcemap || config.sourceMap
				const processed = (sourceMap === 'inline')
					? generated.code + `\n//# sourceMappingURL=${generated.map.toUrl()}\n`
					: generated.code

				cache = buffer
				done(null, processed)
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
