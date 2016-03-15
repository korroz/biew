var Rx = require('rx');
var dispatcher = require('./dispatcher');
var actions = require('./actions');

module.exports = new SlideStore();

function SlideStore() {
    var self = this;

    var _changeSubject = new Rx.Subject();
    var _started = false;
    var _timer = Rx.Disposable.empty;

    self.start = start;
    self.stop = stop;
    self.isSliding = isSliding;
    self.onChange = onChange;

    dispatcher.register(_actionHandler);

    function start() {
        _play(true);
    }
    function stop() {
        _play(false);
    }
    function isSliding() {
        return _started;
    }

    function onChange(listener) {
        return _changeSubject.subscribe(listener);
    }

    function _play(state) {
        _started = !!state;
        _timer.dispose();
        if (_started) _timer = Rx.Observable.timer(2000, 2000).subscribe(function () { actions.nextMedia(); });
        _changeSubject.onNext();
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
