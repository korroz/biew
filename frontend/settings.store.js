var Rx = require('rx');

module.exports = new SettingsStore();

function SettingsStore() {
    var self = this;

    var _settings = {
        pinInfoUI: false,
        slideDelay: 2000
    };
    var _settingsSubject = new Rx.BehaviorSubject(_settings);

    self.observable = observable;
    self.togglePinInfoUI = togglePinInfoUI;
    self.setSlideDelay = setSlideDelay;
    self.getSlideDelay = getSlideDelay;

    function observable() {
        return _settingsSubject.asObservable();
    }

    function togglePinInfoUI() {
        _settings.pinInfoUI = !_settings.pinInfoUI;
        _settingsSubject.onNext(_settings);
    }

    function setSlideDelay(delay) {
        _settings.slideDelay = Number(delay);
        _settingsSubject.onNext(_settings);
    }

    function getSlideDelay() {
        return _settingsSubject.getValue().slideDelay;
    }
}
