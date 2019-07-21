'use strict'

const path = require('path')
const rollup = require('rollup')
const Watcher = require('./Watcher')

function createPreprocessor(preconfig, config, emitter, logger) {
	const cache = new Map()
	const log = logger.create('preprocessor.rollup')

	let watcher
	if (!config.singleRun && config.autoWatch) {
		watcher = new Watcher(emitter)
	}

	return async function preprocess(original, file, done) {
		const location = path.relative(config.basePath, file.path)
		try {
			const options = Object.assign({}, config.rollupPreprocessor, preconfig.options, {
				input: file.path,
				cache: cache.get(file.path),
			})

			const bundle = await rollup.rollup(options)
			cache.set(file.path, bundle.cache)

			if (watcher) {
				const [entry, ...dependencies] = bundle.watchFiles
				watcher.add(entry, dependencies)
			}

			log.info('Generating bundle for ./%s', location)
			const { output } = await bundle.generate(options)

			for (const result of output) {
				if (!result.isAsset) {
					const { code, map } = result
					const { sourcemap } = options.output

					file.sourceMap = map

					/**
					 * for processors that have alternate source file extensions,
					 * make sure to use the output rollup file name
					 */
					const parsedPath = path.parse(file.path)
					file.path = `${parsedPath.dir}/${result.fileName}`

					const processed =
						sourcemap === 'inline' ? code + `\n//# sourceMappingURL=${map.toUrl()}\n` : code

					return done(null, processed)
				}
			}
			log.warn('Nothing was processed.')
			done(null, original)
		} catch (error) {
			log.error('Failed to process ./%s\n\n%s\n', location, error.stack)
			done(error, null)
		}
	}
}

createPreprocessor.$inject = ['args', 'config', 'emitter', 'logger']

module.exports = { 'preprocessor:rollup': ['factory', createPreprocessor] }
