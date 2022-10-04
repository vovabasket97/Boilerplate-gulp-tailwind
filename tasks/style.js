const {
    src,
    dest
} = require('gulp');
const options = require("../config");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const map = require('gulp-sourcemaps');
const tailwindcss = require('tailwindcss');
const bulk = require('gulp-sass-bulk-importer');
const polyfill = require('flex-gap-polyfill');

module.exports = function style() {
    return src(`${options.paths.src.scss}/style.scss`)
        .pipe(bulk())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(postcss([
            tailwindcss(options.config.tailwindjs),
            require('autoprefixer'),
            polyfill(),
        ]))
        .pipe(cleanCSS({
            level: 2,
            compatibility: 'ie8'
        }))
        .pipe(concat('style.min.css'))
        .pipe(map.write('../sourcemaps/'))
        .pipe(dest(options.paths.build.css));
}