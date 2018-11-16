"use strict";

const path = require("path");
const rollup = require("rollup").rollup;
const chokidar = require("chokidar");

function createPreprocessor(options, preconfig, basePath, emitter, logger) {
    const log = logger.create("preprocessor.rollup");
    const watch = new Watch(emitter, log);

    let cache;

    return (content, file, done) => {
        const config = Object.assign({}, options, preconfig.options, {
            input: file.path,
            cache
        });
        rollup(config)
            .then(bundle => {
                cache = bundle.cache;
                watch.capture(bundle);
                log.info("Generating bundle");
                return bundle.generate(config);
            })
            .then(({ code, map }) => {
                file.sourceMap = map;

                const sourcemap =
                    (config.output && config.output.sourcemap) ||
                    config.sourcemap;

                const output =
                    sourcemap === "inline"
                        ? (code += `\n//# sourceMappingURL=${map.toUrl()}\n`)
                        : code;

                done(null, output);
            })
            .catch(error => {
                const location = path.relative(basePath, file.path);
                log.error(
                    "Error processing “%s”\n\n%s\n",
                    location,
                    error.stack || error.message
                );
                done(error, null);
            });
    };
}

function Watch(emitter, log) {
    this.buffer = new Set();
    this.watchList = new Set();
    this.watch = chokidar.watch();
    this.watch.on("change", () => {
        log.info('Change detected');
        emitter.refreshFiles();
    });
    emitter.on("run_start", () => this.start());
}

Watch.prototype.capture = function(bundle) {
    this.buffer.clear();
    bundle.modules.forEach(m => this.buffer.add(m.id));
};

Watch.prototype.clean = function() {
    this.watchList.forEach(m => {
        if (!this.buffer.has(m)) {
            this.watch.unwatch(m);
            this.watchList.delete(m);
        }
    });
};

Watch.prototype.start = function() {
    this.clean();
    this.buffer.forEach(m => {
        if (!this.watchList.has(m) && !m.includes("\u0000")) {
            this.watch.add(m);
            this.watchList.add(m);
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
