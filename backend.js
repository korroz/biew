var express = require('express');
var fs = require('fs');
var path = require('path');
var q = require('q');
var micromatch = require('micromatch');

var app = express();

// Temporary, the idea is that the server is started the directory with media from cmd line.
process.chdir(path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], 'Pictures'));

app.get('/api/media', function (req, res) {
    var ls = q.denodeify(fs.readdir);
    var stat = q.denodeify(fs.stat);
    ls('./').then(function (files) {
        return q.all(micromatch(files, '*.{png,jpg,jpeg,mp4,webm,gif}').map(function (file) {
            return stat(file).then(function (st) { return { name: file, stat: st }; });
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
app.use('/api/file', express.static('./'));
app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(3434, function () {
    console.log('Backend started, listening on port 3434');
});
