var fs = require('fs')
var rollup = require('rollup').rollup
var debounce = require('debounce')

var dependencyMap = new Map()
var staleDependants = new Set()


function createPreprocessor (config, logger) {
	var log = logger.create('preprocessor.rollup')
	var cache

	/**
	 * Manually update the modified and accessed timestamps
	 * of all dependants marked by changed dependencies.
	 */
	var recompileDependants = debounce(function () {
		var now = Date.now()
		for (var dependant of staleDependants.values()) {
			fs.utimes(dependant, now, now, function() {
				log.debug('Recompiling dependant %s', dependant)
			})
		}
		staleDependants.clear()
	}, 50)


	config = config || {}

	function preprocess (content, file, done) {
		log.debug('Processing %s', file.originalPath)

		try {
			config.entry = file.originalPath
			config.cache = cache

			rollup(config).then(function (bundle) {

				/**
				 * Map all dependencies of the current file
				 */
				file.dependencies = bundle.modules
					.map(function (module) { return module.id })
					.filter(function (id) { return id !== file.originalPath })

				dependencyMap.set(file.originalPath, file.dependencies)

				/**
				 * Check all dependants to see if the current file
				 * is one of their dependencies, marking those that
				 * match as stale and triggering their recompilation.
				 */
				for (var entry of dependencyMap.entries()) {
					var dependant = entry[0]
					var dependencies = entry[1]
					if (dependencies.indexOf(file.originalPath) > -1) {
						staleDependants.add(dependant)
						recompileDependants()
					}
				}

				var generated = bundle.generate(config)
				var processed = generated.code

				cache = bundle

				if (config.sourceMap === 'inline') {
					processed += '\n' + '//# sourceMappingURL=' + generated.map.toUrl() + '\n'
				}

				done(null, processed)
			})
			.catch(function (error) {
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

createPreprocessor.$inject = ['config.rollupPreprocessor', 'logger']

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
}
