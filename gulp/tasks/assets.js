const gulp = require('gulp');
const filter = require('gulp-filter');
var imagemin = require('gulp-imagemin');

module.exports = function (config,browser_sync) {
    var config = config;
    var browser_sync = browser_sync

    var is_windows = /^win/.test(process.platform);

    //Moves images, etc. to dist folder
    gulp.task('assets', function() {

        const jpg_filter = filter("**/*.jpg",{restore: true});

        return gulp.src(config.assets.source)
            .pipe(jpg_filter)
            .pipe(imagemin([imagemin.jpegtran({progressive: true})],{verbose: true}))
            .pipe(jpg_filter.restore)
            .pipe(gulp.dest(config.assets.destination))
            .pipe(browser_sync.reload({ stream: true }))
    });

};