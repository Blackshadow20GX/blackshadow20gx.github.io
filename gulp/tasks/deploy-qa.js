const gulp = require('gulp');
const runSequence = require('run-sequence');

module.exports = function (config,browser_sync, qa_config) {
    var config = config;
    var qa_config = qa_config;

    // Deploy Live Server
    gulp.task('deploy-qa', function(callback) {
        // combine config
        for (var key in qa_config) {
            if (qa_config.hasOwnProperty(key)) config[key] = qa_config[key];
        }
        runSequence('default','publish',callback);
    });
};