var React = require('react');
var ImgView = require('./ImgView.component.jsx');
var VidView = require('./VidView.component.jsx');
var cursorStore = require('./cursor.store');
var slideStore = require('./slide.store');
var actions = require('./actions');

module.exports = React.createClass({
    displayName: 'Visualizer',
    getInitialState: function () {
        return { media: cursorStore.current() };
    },
    componentDidMount: function () {
        this.subscriptions = [
            cursorStore.onChange(this.getMedia)
        ];
    },
    componentWillUnmount: function () {
        this.subscriptions.forEach(function (sub) { sub.dispose(); });
    },
    render: function () {
        if (this.state.media.type === 'vid')
            return <VidView file={this.state.media.name} />;
        return <ImgView file={this.state.media.name} />;
    },
    getMedia: function () { this.setState({ media: cursorStore.current() }); }
});
