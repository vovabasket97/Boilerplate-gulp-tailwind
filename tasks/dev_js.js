const { dest } = require("gulp");
const uglify = require("gulp-uglify-es").default;
const bs = require("browser-sync");
const options = require("../config");
const concat = require("gulp-concat");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const babel = require("@rollup/plugin-babel");
const rollup = require("@rollup/stream");
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");

var cache;

module.exports = function dev_js() {
  return rollup({
    input: `${options.paths.src.js}/main.js`,
    plugins: [
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false,
            },
          ],
        ],
        plugins: ["transform-object-rest-spread"],
        babelrc: false,
        exclude: "node_modules/**",
      }),
      commonjs(),
      nodeResolve(),
    ],
    cache: cache,
    output: {
      format: "iife",
      sourcemap: true,
    },
  })
    .on("bundle", function (bundle) {
      cache = bundle;
    })
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(dest(options.paths.build.js))
    .pipe(bs.stream());
};
