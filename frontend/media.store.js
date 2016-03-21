var Rx = require('rx');
var api = require('./api');

module.exports = new MediaStore();

function MediaStore() {
    var self = this;

    var _changeSubject = new Rx.Subject();
    var _media = { path: '', files: [] };

    self.get = get;
    self.getPath = getPath;
    self.hasMedia = hasMedia;
    self.isSpecial = function () { return !!_media.isSpecial; }
    self.onChange = onChange;


    activate();

    function activate() {
        api.getMedia()
            .subscribe(function (media) {
                _media = media;
                _changeSubject.onNext();
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
        return _changeSubject.subscribe(listener);
    }
}
