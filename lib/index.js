'use strict'

const path = require('path')
const rollup = require('rollup')
const chokidar = require('chokidar')
const debounce = require('debounce')

const hasNullByte = string => string.includes('\u0000')

function createWatcher(emitter) {
	let files = new Map()
	let watch = chokidar.watch()

	const refreshFile = filePath => {
		/**
		 * Had to go diving for this one...
		 * not exactly Karma’s public facing API,
		 * but appears to get the job done =)
		 */
		let isPOSIX = path.sep === '/'
		filePath = isPOSIX ? filePath : filePath.replace(/\\/g, '/')
		emitter._fileList.changeFile(filePath, true)
	}

	const handleChange = path => {
		for (const [entry, dependencies] of files.entries()) {
			if (entry === path || dependencies.includes(path)) {
				return refreshFile(entry)
			}
		}
	}

	watch.on('change', debounce(handleChange, 150))

	return {
		add(entry, dependencies) {
			if (!hasNullByte(entry)) {
				let filteredDependencies = dependencies.filter(path => !hasNullByte(path))
				files.set(entry, filteredDependencies)
				watch.add([entry, ...filteredDependencies])
			}
		},
	}
}

function createPreprocessor(preconfig, config, emitter, logger) {
	let cache = new Map()
	let log = logger.create('preprocessor.rollup')

	let watcher
	if (!config.singleRun && config.autoWatch) {
		watcher = createWatcher(emitter)
	}

	return async function preprocess(original, file, done) {
		let originalPath = file.originalPath
		let location = path.relative(config.basePath, originalPath)
		try {
			let options = Object.assign({}, config.rollupPreprocessor, preconfig.options, {
				input: originalPath,
				cache: cache.get(originalPath),
			})

			options.output = Object.assign({}, options.output)

			if (options.output.dir === undefined && options.output.file === undefined) {
				options.output.dir = path.dirname(originalPath)
			}

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
						file.path = path.posix.join(dir, fileName)
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

module.exports = {
	'preprocessor:rollup': [
		'factory',
		(factory => {
			factory.$inject = ['args', 'config', 'emitter', 'logger']
			return factory
		})(createPreprocessor),
	],
}
