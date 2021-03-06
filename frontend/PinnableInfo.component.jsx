var React = require('react');
var settingsStore = require('./settings.store');

module.exports = React.createClass({
    displayName: 'PinnableInfo',
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
        return (
            <span className={this.state.pinned ? 'pinned' : 'unpinned'}>{this.props.info}</span>
        );
    },
    setPinned: function (pinned) { this.setState({ pinned: pinned }); }
});
