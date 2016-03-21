#!/usr/bin/env node
var cli = require('cli');
var open = require('open');
var biew = require('../backend');

cli.parse({
    port: ['p', 'The port to use', 'number', 3434],
    path: [false, 'Path to the media', 'path', './'],
    serve: [false, 'Start only the backend without launching a browser']
})
cli.main(function (args, options) {
    if (options.serve)
        biew(options);
    else
        biew(options, function () {
            open('http://localhost:' + options.port);
        });
});
