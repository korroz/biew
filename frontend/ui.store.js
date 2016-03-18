var Rx = require('rx');
var dispatcher = require('./dispatcher');

module.exports = new UIStore();

function UIStore() {
    var self = this;

    var _rightPanelSubject = new Rx.Subject();

    self.rightPanelObservable = rightPanelObservable;

    dispatcher.register(_actionHandler);

    function rightPanelObservable() {
        return _rightPanelSubject.asObservable();
    }
    function _showRightPanel(jsx) {
        _rightPanelSubject.onNext(jsx);
    }

    function _hideRightPanel() {
        _rightPanelSubject.onNext(null);
    }

    function _actionHandler(payload) {
        switch (payload.actionType) {
            case 'right-panel:show':
                _showRightPanel(payload.content);
                break;
            case 'right-panel:hide':
                _hideRightPanel();
                break;
        }
    }
}
