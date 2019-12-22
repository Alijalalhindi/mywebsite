const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function getStyles(page) {
	return readFile(path.join(__dirname, `../styles/${page}.scss`), 'utf8');
}

async function getScripts(page) {
	return readFile(path.join(__dirname, `../js/${page}.js`), 'utf8');
}


module.exports = {
	getStyles,
	getScripts,
};
