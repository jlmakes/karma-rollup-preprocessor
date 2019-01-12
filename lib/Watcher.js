const chokidar = require("chokidar");
const debounce = require("debounce");

class Watcher {
  constructor(emitter) {
    this.emitter = emitter;
    this.files = new Map();
    this.watch = chokidar.watch();
    this.watch.on("change", debounce(this.handleChange.bind(this), 150));
  }

  add(entry, dependencies) {
    this.files.set(entry, dependencies);
    this.watch.add([entry, ...dependencies]);
  }

  handleChange(path) {
    for (const [entry, dependencies] of this.files.entries()) {
      if (entry === path || dependencies.includes(path)) {
        return this.refreshFile(entry);
      }
    }
  }

  refreshFile(path) {
    this.emitter._fileList.changeFile(path, true);
  }
}

module.exports = Watcher;
