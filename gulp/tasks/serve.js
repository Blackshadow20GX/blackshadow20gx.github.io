const gulp = require('gulp');
const runSequence = require('run-sequence');

module.exports = function (config,browser_sync) {
    var config = config;
    var browser_sync = browser_sync

    gulp.task('serve', function(callback) {
        runSequence(['pages','assets','styles','redirects'],'browser-sync',"watch", callback)
    });
};