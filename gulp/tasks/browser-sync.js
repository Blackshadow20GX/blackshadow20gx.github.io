const gulp = require('gulp');

module.exports = function (config,browser_sync) {
    var config = config;
    var browser_sync = browser_sync

    //Runs the server
    gulp.task('browser-sync', function() {
        return browser_sync.init({ server: { baseDir: config.destination.all } })
    });
};