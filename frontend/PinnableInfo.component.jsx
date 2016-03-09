var React = require('react');

module.exports = React.createClass({
    displayName: 'PinnableInfo',
    getInitialState: function () {
        return { pinned: false };
    },
    render: function () {
        var pinCss = ['fa', 'fa-thumb-tack'];
        if (!this.state.pinned) pinCss.push('fa-rotate-90');
        var pin = <span className="pin-button" style={{ 'margin-left': 15 }} onClick={this.onPinClick}><i className={pinCss.join(' ')}></i></span>;
        return (
            <span className={this.state.pinned ? 'pinned' : 'unpinned'}>{this.props.info}{pin}</span>
        );
    },
    onPinClick: function () {
        this.setState({ pinned: !this.state.pinned });
    }
});
