const chokidar = require("chokidar");
const path = require("path");

class Watcher {
  constructor(basePath, emitter, log) {
    this.basePath = basePath;
    this.emitter = emitter;
    this.log = log;
    this.watch = chokidar.watch();

    this.watch.on("change", filePath => {
      const location = path.relative(basePath, filePath);
      log.info("Change detected in ./%s", location);
      // TODO: handle change...
    });
  }
}

module.exports = Watcher;
