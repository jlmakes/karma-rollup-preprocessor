"use strict";

const path = require("path");
const rollup = require("rollup");
const chokidar = require("chokidar");

function createPreprocessor(options, preconfig, basePath, emitter, logger) {
  const log = logger.create("preprocessor.rollup");
  const watch = new Watch(emitter, log);

  let cache;

  return async function preprocessor(content, file, done) {
    try {
      const config = Object.assign({}, options, preconfig.options, {
        input: file.path,
        cache
      });

      const bundle = await rollup.rollup(config);
      cache = bundle.cache;
      watch.capture(cache.modules);

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

          done(null, processed);
        }
      }
    } catch (error) {
      const location = path.relative(basePath, file.path);
      log.error("Failed to process ./%s\n\n%s\n", location, error.stack);
      done(error, null);
    }
  };
}

function Watch(emitter, log) {
  this.buffer = new Set();
  this.watchList = new Set();
  this.watch = chokidar.watch();
  this.watch.on("change", () => {
    log.info("Change detected");
    emitter.refreshFiles();
  });
  emitter.on("run_start", () => this.start());
}

Watch.prototype.capture = function(modules) {
  this.buffer.clear();
  modules.forEach(module => this.buffer.add(module.id));
};

Watch.prototype.clean = function() {
  this.watchList.forEach(module => {
    if (!this.buffer.has(module)) {
      this.watch.unwatch(module);
      this.watchList.delete(module);
    }
  });
};

Watch.prototype.start = function() {
  this.clean();
  this.buffer.forEach(module => {
    if (!this.watchList.has(module) && !module.includes("\u0000")) {
      this.watch.add(module);
      this.watchList.add(module);
    }
  });
};

createPreprocessor.$inject = [
  "config.rollupPreprocessor",
  "args",
  "config.basePath",
  "emitter",
  "logger"
];

module.exports = { "preprocessor:rollup": ["factory", createPreprocessor] };
