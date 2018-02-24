const gulp = require('gulp');
var shell = require('shelljs');

module.exports = function (config,browser_sync) {
    var config = config;
    var browser_sync = browser_sync

    // TODO: cleanup
    //Creates all the directories required for assigning 301 redirects
    gulp.task('redirects', function() {
        for(var i in config.redirects.urls){
            var init = config.redirects.urls[i].init;
            shell.mkdir('-p', 'dist' + init);
            shell.touch('dist' + init + '/index.html');
        };
        return;
    });
};
