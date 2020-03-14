'use strict'

const path = require('path')
const rollup = require('rollup')
const chokidar = require('chokidar')
const debounce = require('debounce')

const hasNullByte = string => string.includes('\u0000')

class Watcher {
	constructor(emitter) {
		this.emitter = emitter
		this.files = new Map()
		this.watch = chokidar.watch()
		this.watch.on('change', debounce(this.handleChange.bind(this), 150))
	}

	add(entry, dependencies) {
		if (!hasNullByte(entry)) {
			const filteredDependencies = dependencies.filter(path => !hasNullByte(path))
			this.files.set(entry, filteredDependencies)
			this.watch.add([entry, ...filteredDependencies])
		}
	}

	handleChange(path) {
		for (const [entry, dependencies] of this.files.entries()) {
			if (entry === path || dependencies.includes(path)) {
				return this.refreshFile(entry)
			}
		}
	}

	refreshFile(path) {
		this.emitter._fileList.changeFile(path, true)
	}
}

function createPreprocessor(preconfig, config, emitter, logger) {
	let cache = new Map()
	let log = logger.create('preprocessor.rollup')

	let watcher
	if (!config.singleRun && config.autoWatch) {
		watcher = new Watcher(emitter)
	}

	return async function preprocess(original, file, done) {
		let originalPath = file.originalPath
		let location = path.relative(config.basePath, originalPath)
		try {
			let options = Object.assign({}, config.rollupPreprocessor, preconfig.options, {
				input: originalPath,
				cache: cache.get(originalPath),
			})

			let bundle = await rollup.rollup(options)
			cache.set(originalPath, bundle.cache)

			if (watcher) {
				let [entry, ...dependencies] = bundle.watchFiles
				watcher.add(entry, dependencies)
			}

			log.info('Generating bundle for ./%s', location)
			let { output } = await bundle.generate(options.output)

			for (let result of output) {
				if (!result.isAsset) {
					let { code, map, facadeModuleId, fileName } = result

					/**
					 * processors that have alternate source file extensions
					 * must make sure to use the file name output by rollup.
					 */
					if (facadeModuleId && !hasNullByte(facadeModuleId)) {
						let { dir } = path.parse(originalPath)
						file.path = path.join(dir, fileName)
					}

					file.sourceMap = map

					let processed =
						options.output.sourcemap === 'inline'
							? code + `\n//# sourceMappingURL=${map.toUrl()}\n`
							: code

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
