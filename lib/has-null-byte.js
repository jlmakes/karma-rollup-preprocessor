module.exports = function hasNullByte(string) {
	return string.includes('\u0000')
}
