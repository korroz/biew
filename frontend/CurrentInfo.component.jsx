var React = require('react');
var PinnableInfo = require('./PinnableInfo.component.jsx');
var cursorStore = require('./cursor.store');

module.exports = React.createClass({
    displayName: 'CurrentInfo',
    getInitialState: function () {
        return this.makeState();
    },
    componentDidMount: function () {
        this.listenerDeregisters = [
            cursorStore.onChange(this.onCursorChange)
        ];
    },
    componentWillUnmount: function () {
        this.listenerDeregisters.forEach(function (deregister) {
            deregister();
        });
    },
    render: function () {
        return (
            <div className="current-info">
                <div className="info file-info"><PinnableInfo info={this.state.file} /></div>
                <div className="info position-info"><PinnableInfo info={this.state.position.current + '/' + this.state.position.total} /></div>
            </div>
        );
    },
    makeState: function () {
        return { file: cursorStore.current().name, position: cursorStore.position() };
    },
    onCursorChange: function () {
        this.setState(this.makeState());
    }
});
