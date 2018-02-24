var gulp = require('gulp');

module.exports = function () {
    //Generate a spritemap
    //Builds The CSS file
    gulp.task('styles', function() {

        var rawSCSS = gulp.src(STYLES_PATH); //Add to accumulative CSS

        //Final merge, compile with SASS
        return rawSCSS
            .pipe(concat('style.min.css')) //Concatenate into one file
            .pipe(sass())
            //.pipe(uncss({
            //    html: ["**/*.html"]
            //}))
            .pipe(autoprefixer({  //Add prefixes for any browser with more than 1% market share
                browsers: ['> 1%'],
                cascade: false
            }))
            .pipe(cleanCSS({ compatibility: 'ie8' })) //minify
            .pipe(gulp.dest(DESTINATION_PATH))
            .pipe(browserSync.reload({ stream: true }))
    });
};