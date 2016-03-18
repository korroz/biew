var Rx = require('rx');

module.exports = new SettingsStore();

function SettingsStore() {
    var self = this;

    var _settings = {
        pinInfoUI: false
    };
    var _settingsSubject = new Rx.BehaviorSubject(_settings);

    self.observable = observable;
    self.togglePinInfoUI = togglePinInfoUI;

    function observable() {
        return _settingsSubject.asObservable();
    }

    function togglePinInfoUI() {
        _settings.pinInfoUI = !_settings.pinInfoUI;
        _settingsSubject.onNext(_settings);
    }
}
