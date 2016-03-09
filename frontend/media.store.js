var EventEmitter = require('events');
var util = require('util');
var api = require('./api');

function MediaStore() {
    EventEmitter.call(this);
    var self = this;

    self.get = get;
    self.getPath = getPath;
    self.hasMedia = hasMedia;
    self.onChange = onChange;

    var _media = { path: '', files: [] };

    activate();

    function activate() {
        api.getMedia()
            .then(function (media) {
                _media = media;
                self.emit('change');
            });
    }

    function get() {
        return _media.files;
    }

    function getPath() {
        return _media.path;
    }

    function hasMedia() {
        return !!_media.files && _media.files.length > 0;
    }

    function onChange(listener) {
        self.on('change', listener);
        return function () {
            self.removeListener('change', listener);
        };
    }
}
util.inherits(MediaStore, EventEmitter);

module.exports = new MediaStore();
