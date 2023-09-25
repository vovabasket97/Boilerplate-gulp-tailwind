const bs = require("browser-sync");
const options = require("../config");

module.exports = function bs_html() {
  bs.init({
    server: {
      baseDir: options.paths.build.base,
      host: "192.168.0.104",
      port: 5000,
    },
    browser: "chrome",
    logPrefix: "BS-HTML:",
    logLevel: "info",
    logConnections: true,
    logFileChanges: false,
    open: true,
  });
};
