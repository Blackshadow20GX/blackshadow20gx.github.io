const gulp = require('gulp');

module.exports = function (config,browser_sync) {
    var config = config;
    var browser_sync = browser_sync

    gulp.task('watch', function(callback) {
        gulp.watch(config.styles.source, ['styles']);
        gulp.watch(config.pages.source, ['pages']);
        gulp.watch(config.pages.partials_path + "**", ['pages']);
        gulp.watch(config.assets.source, ['assets']);
        browser_sync.reload({stream: true});
    });
};
