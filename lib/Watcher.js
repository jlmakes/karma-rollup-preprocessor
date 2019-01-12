class Watcher {
  constructor(basePath, emitter, log) {
    this.basePath = basePath;
    this.emitter = emitter;
    this.log = log;
  }
}

module.exports = Watcher;
