const {
	src,
	dest
} = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const bs = require('browser-sync');
const options = require("../config");

module.exports = function dev_js() {
	return src(['src/js/classes/**/*.js', 'src/js/**/*.js', 'src/components/**/*.js'])
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(dest(options.paths.build.js))
		.pipe(bs.stream())
}