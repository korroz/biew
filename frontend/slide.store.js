var Rx = require('rx');
var settingsStore = require('./settings.store.js');
var dispatcher = require('./dispatcher');
var actions = require('./actions');

module.exports = new SlideStore();

function SlideStore() {
    var self = this;

    var _started = false;
    var _startedSubject = new Rx.BehaviorSubject(_started);

    /* Marble sketch of the involved streams.
    cursor  ----n---------n------------------
    slide   ----s---------s------------------
    control ------w------c-------------------
    timer   ----------d---------d------------
    output  -------------n------n------------
    */
    var _cursor = dispatcher.observable()
        .pluck('actionType')
        .map(function (at) { var s = at.split(':'); return { thing: s[0], action: s[1] }; })
        .filter(function (a) { return a.thing === 'cursor' && (a.action === 'next' || a.action === 'prev'); });
    var _slideSubject = new Rx.Subject();
    var _slide = _slideSubject.observeOn(Rx.Scheduler.default);
    var _control = new Rx.Subject();
    var _output = _cursor
        .startWith('start')
        .flatMapLatest(function () {
            var timer = Rx.Observable.timer(settingsStore.getSlideDelay());
            return _control
                .startWith(null)
                .do(function (c) { if (c === null) _slideSubject.onNext(); })
                .combineLatest(timer, function (c) { return c; })
                .filter(function (c) { return c === null || c === 'continue'; })
                .map(function () { return 'next'; })
                .take(1);
        });
    var _sub = Rx.Disposable.empty;

    self.start = start;
    self.stop = stop;
    self.wait = wait;
    self.continue = continueFn;
    self.controlObservable = controlObservable;
    self.startedObservable = startedObservable;

    dispatcher.register(_actionHandler);

    function start() {
        if (!_started)
            _sub = _output.subscribe(function () { actions.nextMedia(); });
        _play(true);
    }

    function stop() {
        _sub.dispose();
        _play(false);
    }

    function wait() { _control.onNext('wait'); }
    function continueFn() { _control.onNext('continue'); }
    function controlObservable() { return _slide; }
    function startedObservable() { return _startedSubject.asObservable(); }

    function _play(play) {
        if (play !== _started)
            _startedSubject.onNext(play);
        _started = play;
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
