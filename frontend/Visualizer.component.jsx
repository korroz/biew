var React = require('react');
var ImgView = require('./ImgView.component.jsx');
var VidView = require('./VidView.component.jsx');
var cursorStore = require('./cursor.store');

module.exports = React.createClass({
    displayName: 'Visualizer',
    getInitialState: function () {
        return { media: cursorStore.current() };
    },
    componentDidMount: function () {
        cursorStore.on('change', this.getMedia);
    },
    componentWillUnmount: function () {
        cursorStore.removeListener('change', this.getMedia);
    },
    render: function () {
        if (this.state.media.type === 'vid')
            return <VidView file={this.state.media.name} />;
        return <ImgView file={this.state.media.name} />;
    },
    getMedia: function () {
        this.setState({ media: cursorStore.current() });
    }
});
