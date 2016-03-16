var React = require('react');
var ImgView = require('./ImgView.component.jsx');
var VidView = require('./VidView.component.jsx');
var cursorStore = require('./cursor.store');
var slideStore = require('./slide.store');
var actions = require('./actions');

module.exports = React.createClass({
    displayName: 'Visualizer',
    getInitialState: function () {
        return { media: cursorStore.current(), sliding: false };
    },
    componentDidMount: function () {
        this.subscriptions = [
            cursorStore.onChange(this.getMedia),
            slideStore.onChange(this.slideStarted)
        ];
    },
    componentWillUnmount: function () {
        this.subscriptions.forEach(function (sub) { sub.dispose(); });
    },
    render: function () {
        if (this.state.sliding)
            slideStore.ready();
        if (this.state.media.type === 'vid')
            return <VidView file={this.state.media.name} />;
        return <ImgView file={this.state.media.name} />;
    },
    getMedia: function () { this.setState({ media: cursorStore.current() }); },
    slideStarted: function (started) { this.setState({ sliding: started }); }
});
