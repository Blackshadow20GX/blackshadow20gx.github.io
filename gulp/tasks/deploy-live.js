const gulp = require('gulp');
const runSequence = require('run-sequence');

module.exports = function (config,browser_sync, live_config) {
    var config = config;
    var live_config = live_config;

    // Deploy Live Server
    gulp.task('deploy-live', function(callback) {
        // combine config
        for (var key in live_config) {
            if (live_config.hasOwnProperty(key)) config[key] = live_config[key];
        }
        runSequence('default','publish',callback);
    });
};