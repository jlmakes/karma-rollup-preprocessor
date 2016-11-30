'use strict';

var rollup = require('rollup');

/**
 * @param {Object} args - Config object of custom preprocessor.
 * @param {Object} config - Config object of rollup preprocessor.
 * @param {Object} logger - Karma's log utility.
 * @param {Object} helper - Karma's helper functions.
 * @return {function}
 */
function createPreprocessor (args, config, logger) {
	var log = logger.create('preprocessor.rollup');
	config = config || {};

	function preprocess (content, file, done) {
		log.debug('Processing "%s".', file.originalPath);

		try {
			config.entry = file.originalPath;

			rollup
				.rollup(config)
				.then(function (bundle) {
					var generated = bundle.generate(config);
					var processed = generated.code;

					if (config.sourceMap === 'inline') {
						var url = generated.map.toUrl();
						processed += '\n' + '//# sourceMappingURL=' + url;
					}

					done(null, processed);
				})
				.catch(function (error) {
					log.error('Failed to process "%s".\n  %s', file.originalPath, error.message);
					done(error, null);
				});

		} catch (exception) {
			log.error('%s\n at %s', exception.message, file.originalPath);
			done(exception, null);
		}
	}

	return preprocess;
}

createPreprocessor.$inject = ['args', 'config.rollupPreprocessor', 'logger', 'helper'];

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
};
