var React = require('react');

module.exports = React.createClass({
    displayName: 'PinnableInfo',
    getInitialState: function () {
        return { pinned: false };
    },
    render: function () {
        var leftAlign = this.props.pinPosition === 'left';
        var pinCss = ['fa', 'fa-thumb-tack'];
        if (!this.state.pinned) pinCss.push('fa-rotate-90');
        var pin = <span key="pin" className="pin-button" style={leftAlign ? { marginRight: 15 } : { marginLeft: 15 }} onClick={this.onPinClick}><i className={pinCss.join(' ')}></i></span>;
        var info = <span key="info">{this.props.info}</span>;
        return (
            <span className={this.state.pinned ? 'pinned' : 'unpinned'}>{leftAlign ? [pin, info] : [info, pin]}</span>
        );
    },
    onPinClick: function () {
        this.setState({ pinned: !this.state.pinned });
    }
});
