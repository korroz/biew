var React = require('react');
var ImgView = require('./ImgView.component.jsx');
var VidView = require('./VidView.component.jsx');
var cursorStore = require('./cursor.store');
var slideStore = require('./slide.store');
var actions = require('./actions');

module.exports = React.createClass({
    displayName: 'Visualizer',
    getInitialState: function () {
        return { media: cursorStore.current(), sliding: slideStore.isSliding() };
    },
    componentDidMount: function () {
        this.listenerDeregisters = [
            cursorStore.onChange(this.getMedia),
            slideStore.onChange(this.areWeSliding)
        ];
    },
    componentWillUnmount: function () {
        this.listenerDeregisters.forEach(function (deregister) { deregister(); });
    },
    render: function () {
        if (this.state.sliding)
            this.startTimer();
        if (this.state.media.type === 'vid')
            return <VidView file={this.state.media.name} />;
        return <ImgView file={this.state.media.name} />;
    },
    getMedia: function () { this.setState({ media: cursorStore.current() }); },
    areWeSliding: function () {
        this.stopTimer();
        this.setState({ sliding: slideStore.isSliding() });
    },
    startTimer: function () {
        this.stopTimer();
        this.timer = setTimeout(function () { actions.nextMedia(); this.timer = null; }, 2000);
    },
    stopTimer: function () {
        if (this.timer) clearTimeout(this.timer);
    }
});
