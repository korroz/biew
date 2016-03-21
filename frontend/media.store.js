var Rx = require('rx');
var dispatcher = require('./dispatcher.js');
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
    self.observable = observable;

    dispatcher.observable()
        .filter(function (payload) { return payload.actionType === 'media:shuffle'; })
        .subscribe(shuffleMedia);

    _activate();

    function _activate() {
        api.getMedia()
            .subscribe(function (media) {
                _media = media;
                _changeSubject.onNext(media);
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

    function observable() {
        return _changeSubject.asObservable();
    }

    function shuffleMedia() {
        var r = function (max) { return Math.floor(Math.random() * (max + 1)); };
        var files = _media.files;

        for (var i = files.length - 1; i > 0 ; i--) {
            var swp = files[i];
            var rnd = r(i - 1);
            files[i] = files[rnd];
            files[rnd] = swp;
        }
        _changeSubject.onNext(_media);
    }
}
