const gulp = require('gulp');
const filter = require('gulp-filter');
const canonicalURLInjector = require('../plugins/canonical-url');
const googleAnlyticsInjector = require('../plugins/google-analytics');
const htmlmin = require("gulp-htmlmin");
const sitemap = require('gulp-sitemap');
const nunjucks = require('gulp-nunjucks-render');
var rename = require('gulp-rename');

module.exports = function (config,browser_sync) {
    var config = config;
    var browser_sync = browser_sync

    //Moves HTML files into dist
    gulp.task('pages', function() {
        const sitemap_filter = filter(config.pages.sitemap_include);
        const regular_pages = filter(config.pages.pretty_url_include,{restore: true});

        return gulp.src(config.pages.source)
            // Resolve templates
            .pipe(nunjucks({ path: config.pages.partials_path }))

            // Move page.html into /page/index.html
            .pipe(regular_pages)
            .pipe(rename(function (path) {
                if (path.basename !== config.pages.root) { //main page goes at root
                    path.dirname = path.dirname + '/' + path.basename;
                }
                path.basename = 'index';
            }))
            .pipe(regular_pages.restore)

            .pipe(googleAnlyticsInjector({id:config.site.google_analytics_uid}))
            .pipe(canonicalURLInjector({url:config.site.url,placeholder:config.pages.canonical_placeholder}))
            .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true })) //minify
            .pipe(gulp.dest(config.pages.destination))
            .pipe(browser_sync.reload({ stream: true }))

            // Sitemap
            .pipe(sitemap_filter)
            .pipe(sitemap({siteUrl: config.site.url}))
            .pipe(gulp.dest(config.pages.destination))
            .pipe(browser_sync.reload({ stream: true }))

            // AMP Pages
            // TODO: implement
    });
};
