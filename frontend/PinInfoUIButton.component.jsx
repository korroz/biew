var React = require('react');
var settingsStore = require('./settings.store');

module.exports = React.createClass({
    displayName: 'PinInfoUIButton',
    getInitialState: function () {
        return { pinned: false };
    },
    componentDidMount: function () {
        this.subs = [
            settingsStore.observable().map(function (s) { return s.pinInfoUI; }).subscribe(this.setPinned)
        ];
    },
    componentWillUnmount: function () {
        this.subs.forEach(function (sub) { sub.dispose(); });
    },
    render: function () {
        var css = ['fa', 'fa-thumb-tack', this.state.pinned ? '' : 'fa-rotate-90'].join(' ');
        return <button onClick={this.pin}><i className={css}></i></button>
    },
    setPinned: function (pinned) {
        this.setState({ pinned: pinned });
    },
    pin: function () {
        settingsStore.togglePinInfoUI();
    }
});
