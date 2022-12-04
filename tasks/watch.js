const {
    watch,
    parallel,
    series
} = require('gulp');
const options = require("../config");

module.exports = function watching() {
    watch(`${options.paths.src.base}/**/*.html`, parallel('html', 'style'));
    watch(['src/configurator/**/*', 'src/json/**/*'], parallel('move_files'));
    watch([options.config.tailwindjs, `${options.paths.src.base}/**/*.scss`],series('style'));
    watch(`${options.paths.src.js}/**/*.js`,series('dev_js'));
    watch('src/img/**/*', series('rastr'));
    watch('src/svg/css/**/*.svg', series('svg_css', 'style'));
    watch('src/svg/**/*.svg', series('rastr'));
    watch('src/fonts/**/*.ttf', series('ttf', 'ttf2', 'fonts'));
}