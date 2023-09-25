const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const ttf2woff2 = require('gulp-ttftowoff2');
const ttf2woff = require('gulp-ttf2woff');
const options = require('../config');

let appFonts = options.paths.build.fonts;

module.exports = function ttf(done) {
  return src('src/fonts/**/*.ttf')
    .pipe(
      changed(appFonts, {
        extension: '.woff2',
        hasChanged: changed.compareLastModifiedTime
      })
    )
    .pipe(ttf2woff2())
    .pipe(dest(appFonts));
  done();
};
