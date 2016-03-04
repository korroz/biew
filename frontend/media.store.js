var EventEmitter = require('events');
var util = require('util');

function MediaStore() {
    EventEmitter.call(this);
    var self = this;

    self.get = get;
    self.hasMedia = hasMedia;
    self.onChange = onChange;

    var _media = [];

    function get() {
        return _media;
    }

    function hasMedia() {
        return !!_media && _media.length > 0;
    }

    function onChange(listener) {
        self.on('change', listener);
        return function () {
            self.removeListener('change', listener);
        }
    }
}
util.inherits(MediaStore, EventEmitter);

module.exports = new MediaStore();
