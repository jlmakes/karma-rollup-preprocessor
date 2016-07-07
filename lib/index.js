'use strict';

const fs = require('fs');
const rollup = require('rollup');
const debounce = require('debounce');

const dependencies = new Map()
const changedParents = new Set()
const WAIT = 25

const touchParents = debounce(() => {
  var now = new Date();
  for (var parent of changedParents.values()) {
    fs.utimes(parent, now, now);
  }
  changedParents.clear();
}, WAIT)


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
        log.info(' 🗞  Rollup of "%s".', file.originalPath);

        try {
            rollupConfig.entry = file.originalPath;

            rollup
                .rollup(rollupConfig)
                .then(function (bundle)
                {
                    // Map this file to the dependencies that Rollup just
                    // compiled.
                    dependencies.set(
                      file.originalPath,
                      bundle.modules
                        .map((b) => b.id)
                        .filter((op) => op != file.originalPath))

                    // Work backwards from dependencies to see what
                    // relies on this file, then trigger a recompilation of
                    // it.
                    for (var [parent, dependList] of dependencies.entries()) {
                      if (dependList.includes(file.originalPath)) {
                        log.debug(" \n%s depends on \n\t%s\n    Recompiling it.",
                          parent, file.originalPath);
                        changedParents.add(parent);
                        touchParents();
                      }
                    }

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
                    log.error('%s\n  at %s:%d', e.message, file.originalPath, e.location.first_line)
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
