'use strict'

const chokidar = require('chokidar')
const debounce = require('debounce')

class Watcher {
	constructor(emitter) {
		this.emitter = emitter
		this.files = new Map()
		this.watch = chokidar.watch()
		this.watch.on('change', debounce(this.handleChange.bind(this), 150))
	}

	add(entry, dependencies) {
		if (!hasNullByte(entry)) {
			const filteredDependencies = dependencies.filter(path => !hasNullByte(path))
			this.files.set(entry, filteredDependencies)
			this.watch.add([entry, ...filteredDependencies])
		}
	}

	handleChange(path) {
		for (const [entry, dependencies] of this.files.entries()) {
			if (entry === path || dependencies.includes(path)) {
				return this.refreshFile(entry)
			}
		}
	}

	refreshFile(path) {
		this.emitter._fileList.changeFile(path, true)
	}
}

function hasNullByte(string) {
	return string.includes('\u0000')
}

module.exports = Watcher
