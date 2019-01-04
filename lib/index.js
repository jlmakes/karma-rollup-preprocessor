"use strict";

const path = require("path");
const rollup = require("rollup");

function createPreprocessor(options, preconfig, basePath, logger) {
  const log = logger.create("preprocessor.rollup");

  let cache;

  return async function preprocess(original, file, done) {
    try {
      const config = Object.assign({}, options, preconfig.options, {
        input: file.path,
        cache
      });

      const bundle = await rollup.rollup(config);
      cache = bundle.cache;

      const { output } = await bundle.generate(config);

      for (const result of output) {
        if (!result.isAsset) {
          const { code, map } = result;
          const { sourcemap } = config.output;

          file.sourceMap = map;

          const processed =
            sourcemap === "inline"
              ? code + `\n//# sourceMappingURL=${map.toUrl()}\n`
              : code;

          return done(null, processed);
        }
      }
      log.warn("Nothing was processed.");
      done(null, original);
    } catch (error) {
      const location = path.relative(basePath, file.path);
      log.error("Failed to process ./%s\n\n%s\n", location, error.stack);
      done(error, null);
    }
  };
}

createPreprocessor.$inject = [
  "config.rollupPreprocessor",
  "args",
  "config.basePath",
  "logger"
];

module.exports = { "preprocessor:rollup": ["factory", createPreprocessor] };
