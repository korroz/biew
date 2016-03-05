#!/usr/bin/env node
var cli = require('cli');
var open = require('open');
var biew = require('../backend');

cli.parse({
    port: ['p', 'The port to use', 'number', 3434],
    path: [false, 'Path to the media', 'path', './']
})
cli.main(function (args, options) {
    biew(options, function () {
        open('http://localhost:' + options.port);
    });
});
