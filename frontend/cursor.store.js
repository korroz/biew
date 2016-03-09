var EventEmitter = require('events');
var util = require('util');
var mediaStore = require('./media.store');
var dispatcher = require('./dispatcher');


function CursorStore(dispatcher, mediaStore) {
    EventEmitter.call(this);
    var self = this;

    var _currentIndex = 0;

    this.current = current;
    this.position = position;
    this.onChange = onChange;
    this.prev = prev;
    this.next = next;

    dispatcher.register(_actionHandler);

    function prev() {
        _changeBy(-1);
    }

    function next() {
        _changeBy(1);
    }

    function current() {
        var media = mediaStore.get();
        if (media)
            return media[_currentIndex];
    }

    function position() {
        return { current: _currentIndex + 1, total: mediaStore.get().length };
    }

    function onChange(listener) {
        self.on('change', listener);
        return function () {
            self.removeListener('change', listener);
        };
    }

    function _changeBy(delta) {
        var newIndex = _currentIndex + delta;
        var lastIndex = mediaStore.get().length - 1;
        if (newIndex < 0)
            _currentIndex = lastIndex;
        else if (newIndex > lastIndex)
            _currentIndex = 0;
        else
            _currentIndex = newIndex;

        self.emit('change');
    }

    function _actionHandler(payload) {
        switch (payload.actionType) {
            case 'cursor:prev':
                self.prev();
                break;
            case 'cursor:next':
                self.next();
            default:

        }
    }
}
util.inherits(CursorStore, EventEmitter);

module.exports = new CursorStore(dispatcher, mediaStore);
