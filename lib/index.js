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


    function preprocess (content, file, done)
    {
        log.debug('Processing "%s".', file.originalPath);

        try {
            config.entry = file.originalPath;

            rollup
                .rollup(config)
                .then(function (bundle)
                {
                    var processed = bundle.generate({format: 'es6'}).code;
                    done(null, processed);
                })
                .catch(function (error)
                {
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
