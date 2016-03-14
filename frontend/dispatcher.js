var Rx = require('rx');

module.exports = new Dispatcher();

function Dispatcher() {
    var self = this;

    var _subject = new Rx.Subject();

    self.register = register;
    self.dispatch = dispatch;

    function register(listener) {
        return _subject.subscribe(listener);
    }

    function dispatch(payload) {
        _subject.onNext(payload);
    }
}
