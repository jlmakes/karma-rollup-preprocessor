'use strict';

var rollup = require('rollup');

// @param args {Object} - Config object of custom preprocessor.
// @param config {Object} - Config object of rollupPreprocessor.
// @param logger {Object} - Karma's logger.
// @helper helper {Object} - Karma's helper functions.
function createPreprocessor (args, config, logger, helper)
{
	var log = logger.create('preprocessor.rollup');
	config = config || {};

	var rollupConfig = config.rollup || {};
	var bundleConfig = config.bundle || {};

	function preprocess (content, file, done)
	{
		log.debug('Processing "%s".', file.originalPath);

		try {
			rollupConfig.entry = file.originalPath;

			rollup
				.rollup(rollupConfig)
				.then(function (bundle)
				{
					if (!bundleConfig.hasOwnProperty('format')) {
						bundleConfig.format = 'es6';
					}

					var generated = bundle.generate(bundleConfig);
					var processed = generated.code;

					if (bundleConfig.sourceMap === 'inline') {
						var url = generated.map.toUrl();
						processed += "\n" + '//# sourceMappingURL=' + url;
					}

					done(null, processed);
				})
				.catch(function (error)
				{
					log.error('Failed to process "%s".\n  %s', file.originalPath, error.message);
					done(error, null)
				});

		}
		catch (exception) {
			log.error('%s\n at %s', exception.message, file.originalPath);
			done(exception, null);
		}
	}

	return preprocess;
}

createPreprocessor.$inject = ['args', 'config.rollupPreprocessor', 'logger', 'helper'];

module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor]
};
