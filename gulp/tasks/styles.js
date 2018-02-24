const gulp = require('gulp');
const concat = require("gulp-concat");
const sass = require("gulp-sass");
//const cleanCSS =  require("gulp-clean-css");
const uncss =  require("gulp-uncss");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require('gulp-sourcemaps');

module.exports = function (config,browser_sync) {
    var config = config;
    var browser_sync = browser_sync

    //Generate a spritemap
    //Builds The CSS file
    gulp.task('styles', function() {
        // TODO: css sprites
        return gulp.src(config.styles.source)
            .pipe(sourcemaps.init())
            // TODO: use snippet files for variables
            .pipe(concat('style.min.css')) //Concatenate into one file
            .pipe(sass())
            // TODO: use uncss once sorted out how to get final html
            //.pipe(uncss({html: ["dist/**/*.html"]}))
            //Add prefixes for any browser with more than 1% market share
            .pipe(autoprefixer({
                browsers: ['> 5% in AU'],
                cascade: false
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.styles.destination))
            .pipe(browser_sync.reload({ stream: true }))
    });
};