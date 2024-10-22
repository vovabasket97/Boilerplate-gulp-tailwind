const { src, dest } = require("gulp");
const options = require("../config");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const tailwindcss = require("tailwindcss");
const bulk = require("gulp-sass-bulk-importer");
const bs = require("browser-sync");

const handleStyles = async (url, name) => {
  await src(url)
    .pipe(bulk())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      postcss([tailwindcss(options.config.tailwindjs), require("autoprefixer")])
    )
    .pipe(cleanCSS({ level: 2, compatibility: "ie8" }))
    .pipe(concat(`${name}.min.css`))
    .pipe(dest(options.paths.build.css))
    .pipe(bs.stream());
};

module.exports = async function style() {
  const main = await handleStyles(
    `${options.paths.src.scss}/style.scss`,
    "style"
  );

  return main;
};
