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

const generateFile = async ({
  filePath = options.paths.src.js,
  filename,
  minFileName,
}) => {
  return await rollup({
    input: `${filePath}/${filename}`,
    plugins: [
      babel({
        presets: [["@babel/preset-env", { modules: false }]],
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
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(concat(minFileName))
    .pipe(dest(options.paths.build.js))
    .pipe(bs.stream());
};

module.exports = async function dev_js() {
  const main = await generateFile({
    filename: "main.js",
    minFileName: "main.min.js",
  });

  return [main];
};
