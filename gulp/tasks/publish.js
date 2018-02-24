const gulp = require('gulp');
const awspublish = require('gulp-awspublish');
const awspublishRouter = require('gulp-awspublish-router');

module.exports = function (config,browser_sync) {
    var config = config;
    var browser_sync = browser_sync

    //Publishes each file to S3, appending metadata to files matching
    //routes specified.
    gulp.task('publish', function () {
        var publisher = awspublish.create({
            params:{
                Bucket: config.publish.s3_bucket,
                ACL: 'public-read',
                Metadata: config.publish.metadata
            }
        });

        //Get the routes into a format that awspublishRouter needs
        var routes = {};
        for (i in config.redirects.urls){
            var route = config.redirects.urls[i];
            routes[route.regex] = {
                headers: {
                    WebsiteRedirectLocation: route.redirect
                }
            }
        }
        routes["^.+$"] = "$&"; //Don't redirect any of the other pages

        // Files are only updated if a change is detected, as directs are
        // metadata this does not get applied unless files deleted first
        return gulp.src(config.publish.output)
            .pipe(awspublishRouter({
                routes: routes
            }))
            .pipe(publisher.publish())
            .pipe(awspublish.reporter())
    });
};
