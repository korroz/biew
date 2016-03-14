var React = require('react');
var Visualizer = require('./Visualizer.component.jsx');
var CursorControls = require('./CursorControls.component.jsx');
var CurrentInfo = require('./CurrentInfo.component.jsx');
var mediaStore = require('./media.store.js');

module.exports = React.createClass({
    displayName: 'BiewApp',
    getInitialState: function () {
        return { hasMedia: mediaStore.hasMedia() };
    },
    componentDidMount: function () {
        this.subscriptions = [
            mediaStore.onChange(this.onMediaChange)
        ];
    },
    componentWillUnmount: function () {
        this.subscriptions.forEach(function (sub) {
            sub.dispose();
        });
    },
    render: function () {
        var special = [68, 101, 97, 114, 32, 80, 111, 114, 111, 44, 32, 112, 108, 101, 97, 115, 101, 32, 108, 101, 97,
                114, 110, 32, 104, 111, 119, 32, 116, 111, 32, 117, 115, 101, 32, 116, 104, 101, 32, 99, 111, 109, 109,
                97, 110, 100, 32, 108, 105, 110, 101, 46];
        var extraMsg = mediaStore.isSpecial() ? <div style={{ marginTop: 20 }}>{String.fromCharCode.apply(null, special)}</div> : null;
        if (!this.state.hasMedia)
            return (
                <div className="viewer no-media">
                    <div><i className="fa fa-exclamation-circle fa-2x"></i>No media found in:</div>
                    <div>{mediaStore.getPath()}</div>{extraMsg}
                </div>
            );
        return (
            <div className="viewer">
                <Visualizer />
                <CurrentInfo />
                <CursorControls />
            </div>
        );
    },
    onMediaChange: function () {
        this.setState({ hasMedia: mediaStore.hasMedia() });
    }
});
