const gulp = require('gulp');
var del = require('del');

module.exports = function (config,browser_sync) {
    var config = config;
    var browser_sync = browser_sync

    //Deletes the current dist folder so that it can be rebuilt
    gulp.task('clean', function() {
        return del([
            config.destination.all
        ])
    });
};