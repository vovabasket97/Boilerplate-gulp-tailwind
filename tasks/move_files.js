const {
	src,
	dest
} = require('gulp');
const bs = require('browser-sync');
const options = require("../config");

module.exports = function rastr() {
	return src(['src/configurator/**/*', "src/json/**/*"], {base: 'src/'})
		.pipe(dest(options.paths.build.base))
		.pipe(bs.stream())
}