const bs = require('browser-sync');
const options = require("../config");

module.exports = function bs_html() {
    bs.init({
		server: {
			baseDir: options.paths.build.base,
			host: '192.168.0.104',
            port: options.config.port || 5000
		},
		callbacks: {
			ready: function (err, bs) {
				bs.addMiddleware("*", function (req, res) {
					res.writeHead(302, {
						location: "404.html"
					});
					res.end("Redirecting!");
				});
			}
		},
		browser: 'chrome',
		logPrefix: 'BS-HTML:',
		logLevel: 'info',
		logConnections: true,
		logFileChanges: false,
		open: true
	})
}