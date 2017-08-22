'use strict'

const rollup = require('rollup')


function createPreprocessor () {

	return (content, file, done) => {
		done(null, content)
	}

}


module.exports = {
	'preprocessor:rollup': ['factory', createPreprocessor],
}
