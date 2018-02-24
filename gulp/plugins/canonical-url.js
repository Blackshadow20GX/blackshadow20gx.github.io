var through = require('through2');

module.exports = function(options) {
    options                = options || {};
    options.url             = options.url || '';
    options.placeholder    = options.placeholder || 'CANONICAL_URL';

    return through.obj(function(file, encoding, callback) {
        if(file.isNull()) return callback(null, file);
        if(file.isStream()) return callback(new Error('Canonical URLS: streams not supported'));

        var canonical_url = options.url + '/' + file.relative;

        // TODO: make optional
        canonical_url = canonical_url.replace('/index.html', '');

        var content = file.contents.toString();
        content = content.replace(options.placeholder, canonical_url);
        file.contents = new Buffer(content);
        callback(null, file);
    });
};


