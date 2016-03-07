var express = require('express');
var fs = require('fs');
var path = require('path');
var q = require('q');
var micromatch = require('micromatch');

module.exports = function (options, callback) {
    var app = express();

    var ls = q.denodeify(fs.readdir);
    var stat = q.denodeify(fs.stat);
    var media = ls(options.path)
    .then(function (files) { return micromatch(files, '*.{png,jpg,jpeg,mp4,webm,gif}');})
    .then(function (files) {
        return q.all(files.map(function (file) {
            var mediaType;

            if (micromatch.isMatch(file, '*.{png,jpg,jpeg,gif}'))
                mediaType = 'img';
            else if (micromatch.isMatch(file, '*.{mp4,webm}'))
                mediaType = 'vid';

            return stat(path.join(options.path, file)).then(function (st) { return { name: file, type: mediaType, stat: st }; });
        }));
    })
    .then(function (files) {
        return files.filter(function (fi) { return fi.stat.isFile(); });
    });

    app.get('/api/media', function (req, res) {
        media.then(function (files) {
            res.json(files);
        }, function (err) {
            res.status(500).json(err);
        });
    });
    app.use('/api/file', function (req, res, next) {
        var file = req.url.substr(1);
        media.then(function (files) {
            if (files.some(function (f) { return f.name === file; }))
                next();
            else
                res.status(404).end();
        });
    });
    app.use('/api/file', express.static(options.path));
    app.use(express.static(path.join(__dirname, 'dist')));

    return app.listen(options.port, function () {
        console.log('biew running..');
        if (callback)
            callback();
    });
}
