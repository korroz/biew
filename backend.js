var express = require('express');
var fs = require('fs');
var q = require('q');

var app = express();

app.get('/api/media', function (req, res) {
    var ls = q.denodeify(fs.readdir);
    var stat = q.denodeify(fs.stat);
    ls('./').then(function (files) {
        return q.all(files.map(function (file) {
            return stat(file).then(function (st) { return { name: file, stat: st }; });
        }));
    })
    .then(function (fileInfo) {
        res.json(fileInfo);
    }, function (err) {
        res.status(500).end();
    });
});
app.use(express.static('frontend'));

app.listen(3434, function () {
    console.log('Backend started, listening on port 3434');
});
