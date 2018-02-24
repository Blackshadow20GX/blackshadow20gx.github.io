const gulp = require("gulp");
var browserSync  = require("browser-sync").create();

//User Settings
var config_live = require("./config-live.json");
var config_qa = require("./config-qa.json");
var config = require("./config.json");
config.redirects = require("./redirects.json");

gulp.task('default', ['pages','assets','styles','redirects']);

require('./gulp/tasks/watch')(config, browserSync);
require('./gulp/tasks/deploy-live')(config, browserSync, config_live);
require('./gulp/tasks/deploy-qa')(config, browserSync, config_qa);
require('./gulp/tasks/clean')(config, browserSync);
require('./gulp/tasks/browser-sync')(config, browserSync);
require('./gulp/tasks/serve')(config, browserSync);
require('./gulp/tasks/publish')(config, browserSync);

require('./gulp/tasks/styles')(config, browserSync);
require('./gulp/tasks/assets')(config, browserSync);
require('./gulp/tasks/pages')(config, browserSync);
require('./gulp/tasks/redirects')(config, browserSync);