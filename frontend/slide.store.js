var EventEmitter = require('events');
var util = require('util');
var dispatcher = require('./dispatcher');

function SlideStore() {
    EventEmitter.call(this);
    var self = this;

    var _started = false;

    self.start = start;
    self.stop = stop;
    self.isSliding = isSliding;
    self.onChange = onChange;

    dispatcher.register(_actionHandler);

    function start() {
        _started = true;
        self.emit('change');
    }
    function stop() {
        _started = false;
        self.emit('change');
    }
    function isSliding() {
        return _started;
    }

    function onChange(listener) {
        self.on('change', listener);
        return function () {
            self.removeListener('change', listener);
        };
    }

    function _actionHandler(payload) {
        switch (payload.actionType) {
            case 'slide:start':
                self.start();
                break;
            case 'slide:stop':
                self.stop();
                break;
        }
    }
}
util.inherits(SlideStore, EventEmitter);

module.exports = new SlideStore();
