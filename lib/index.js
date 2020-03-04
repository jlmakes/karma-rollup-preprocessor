'use strict'

const path = require('path')
const rollup = require('rollup')
const Watcher = require('./Watcher')
const hasNullByte = require('./has-null-byte')

function createPreprocessor(preconfig, config, emitter, logger) {
	const cache = new Map()
	const log = logger.create('preprocessor.rollup')

	let watcher
	if (!config.singleRun && config.autoWatch) {
		watcher = new Watcher(emitter)
	}

	return async function preprocess(original, file, done) {
		const originalPath = file.originalPath
		const location = path.relative(config.basePath, originalPath)
		try {
			const options = Object.assign({}, config.rollupPreprocessor, preconfig.options, {
				input: originalPath,
				cache: cache.get(originalPath),
			})

			const bundle = await rollup.rollup(options)
			cache.set(originalPath, bundle.cache)

			if (watcher) {
				const [entry, ...dependencies] = bundle.watchFiles
				watcher.add(entry, dependencies)
			}

			log.info('Generating bundle for ./%s', location)
			const { output } = await bundle.generate(options.output)

			for (const result of output) {
				if (!result.isAsset) {
					const { code, map } = result
					const { sourcemap } = options.output

					file.sourceMap = map

					/**
					 * processors that have alternate source file extensions
					 * must make sure to use the output rollup file name.
					 */
					if (result.facadeModuleId && !hasNullByte(result.facadeModuleId)) {
						const parsedPath = path.parse(originalPath)
						file.path = `${parsedPath.dir}/${result.fileName}`
					}

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
