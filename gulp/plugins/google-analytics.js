var through = require('through2');

module.exports = function(options) {
    options                = options || {};
    options.id             = options.id || '';

    return through.obj(function(file, encoding, callback) {
        if(file.isNull()) return callback(null, file);
        if(file.isStream()) return callback(new Error('GoogleAnalytics: streams not supported'));

        var analytics_script = "<script async src=\"https://www.googletagmanager.com/gtag/js?id=" + options.id + "\"></script>"+
         "<script>"+
        "window.dataLayer = window.dataLayer || [];"+
        "function gtag(){dataLayer.push(arguments);}"+
        "gtag('js', new Date());"+
        "gtag('config', '" + options.id + "');"+
        "<\/script><\/head>"

        var content = file.contents.toString();
        content = content.replace('<\/head>', analytics_script);
        file.contents = new Buffer(content);
        callback(null, file);
    });
};


