var React = require('react');
var Visualizer = require('./Visualizer.component.jsx');
var CursorControls = require('./CursorControls.component.jsx');
var mediaStore = require('./media.store.js');

module.exports = React.createClass({
    displayName: 'BiewApp',
    getInitialState: function () {
        return { hasMedia: mediaStore.hasMedia() };
    },
    componentDidMount: function () {
        this.listenerDeregisters = [
            mediaStore.onChange(this.onMediaChange)
        ];
    },
    componentWillUnmount: function () {
        this.listenerDeregisters.forEach(function (deregister) {
            deregister();
        });
    },
    render: function () {
        if (!this.state.hasMedia)
            return (
                <div className="viewer no-media">
                    <i className="fa fa-exclamation-circle fa-2x"></i><span>No media found in: {mediaStore.getPath()}</span>
                </div>
            );
        return (
            <div className="viewer">
                <Visualizer />
                <div className="controls">
                    <CursorControls />
                </div>
            </div>
        );
    },
    onMediaChange: function () {
        this.setState({ hasMedia: mediaStore.hasMedia() });
    }
});
