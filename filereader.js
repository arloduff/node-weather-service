var fs = require('fs');

module.exports = class FileReader {
	constructor (filename) {
		this.filename = filename;
	}

	readFileAsArray () {
		return fs.readFileSync(this.filename).toString().split('\n');
	}

	readFileAsString () {
		return fs.readFileSync(this.filename).toString();
	}
}
