var express = require('express');
var fs = require('fs');
var path = require('path');
var q = require('q');
var micromatch = require('micromatch');

var app = express();

app.get('/api/media', function (req, res) {
    var ls = q.denodeify(fs.readdir);
    var stat = q.denodeify(fs.stat);
    var dirPath = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], 'Pictures');
    ls(dirPath).then(function (files) {
        return q.all(micromatch(files, '*.{png,jpg,jpeg,mp4,webm,gif}').map(function (file) {
            return stat(path.join(dirPath, file)).then(function (st) { return { name: file, stat: st }; });
        }));
    })
    .then(function (fileInfo) {
        res.json(fileInfo.filter(function (fi) {
            return fi.stat.isFile();
        }));
    }, function (err) {
        res.status(500).json(err);
    });
});
app.use(express.static('frontend'));

app.listen(3434, function () {
    console.log('Backend started, listening on port 3434');
});
