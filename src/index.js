'use strict';

var rollup = require('rollup').rollup;

var dependencyMap = new Map();


function createPreprocessor (config, logger) {
	var log = logger.create('preprocessor.rollup');
	var cache;

	config = config || {};

	function preprocess (content, file, done) {
		log.debug('Processing %s', file.originalPath);

		try {
			config.entry = file.originalPath;
			config.cache = cache;

			rollup(config).then(function (bundle) {

				/**
				 * Map all dependencies of the current file
				 */
				file.dependencies = bundle.modules
					.map(function (module) { return module.id; })
					.filter(function (id) { return id !== file.originalPath; });

				dependencyMap.set(file.originalPath, file.dependencies);

				var generated = bundle.generate(config);
				var processed = generated.code;

				cache = bundle;

				if (config.sourceMap === 'inline') {
					processed += '\n' + '//# sourceMappingURL=' + generated.map.toUrl() + '\n';
				}

				done(null, processed);
			})
			.catch(function (error) {
				log.error('Failed to process %s\n\n%s\n', file.originalPath, error.message);
				done(error, null);
			});

		} catch (exception) {
			log.error('Exception processing %s\n\n%s\n', file.originalPath, exception.message);
			done(exception, null);
		}
	}

	return preprocess;
}

createPreprocessor.$inject = ['config.rollupPreprocessor', 'logger'];

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
};
