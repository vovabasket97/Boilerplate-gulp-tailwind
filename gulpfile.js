const gulp = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

for(const func in tasks){
  exports[func] = tasks[func];
}

exports.build = gulp.parallel(
  tasks.move_files,
  tasks.ttf,
  tasks.ttf2,
  tasks.fonts,
  tasks.style,
  tasks.dev_js,
  tasks.rastr,
  tasks.html
)

exports.dev = gulp.series(
  gulp.series(exports.build),
  gulp.parallel(tasks.server, tasks.watch)
)