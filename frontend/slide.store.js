var Rx = require('rx');
var dispatcher = require('./dispatcher');
var actions = require('./actions');

module.exports = new SlideStore();

function SlideStore() {
    var self = this;

    var _started = false;
    var _timer = Rx.Disposable.empty;
    var _ready = new Rx.Subject();
    var _change = new Rx.Subject();
    var _slideStream = dispatcher.observable()
        .pluck('actionType')
        .map(function (a) { return a.split(':'); })
        .filter(function (a) { return a[0] === 'cursor' && (a[1] === 'next' || a[1] === 'prev'); })
        .startWith(null)
        .flatMapLatest(function (v, i) {
            console.log('flatMap Slide', i);
            return Rx.Observable.timer(2000)
                .do(function () { console.log('Timer done!'); })
                .combineLatest(_ready)
                .take(1);
        })
        .share();

    self.start = start;
    self.stop = stop;
    self.ready = ready;
    self.onChange = onChange;

    dispatcher.register(_actionHandler);

    function start() {
        console.log('Start slideshow.');
        _timer.dispose();
        _timer = _slideStream.subscribe(function () { actions.nextMedia(); });
        _play(true);
    }

    function stop() {
        _timer.dispose();
        _play(false);
    }

    function ready() {
        console.log('Ready!');
        _ready.onNext();
    }

    function onChange(listener) {
        return _change.subscribe(listener);
    }

    function _play(play) {
        _started = play;
        _change.onNext(_started);
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
