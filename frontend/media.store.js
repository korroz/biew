var EventEmitter = require('events');
var util = require('util');

function MediaStore() {
    EventEmitter.call(this);
    this.get = get;
}
util.inherits(MediaStore, EventEmitter);

module.exports = new MediaStore();

var media = [];

function get() {
    return media;
}
