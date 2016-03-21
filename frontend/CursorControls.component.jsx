var React = require('react');
var actions = require('./actions');

module.exports = React.createClass({
    displayName: 'CursorControls',
    componentDidMount: function () {
        Mousetrap.bind('left', this.clickPrev);
        Mousetrap.bind('right', this.clickNext);
    },
    componentWillUnmount: function () {
        Mousetrap.unbind(['left', 'right']);
    },
    render: function () {
        return (
            <div className="controls">
                <div className="control" onClick={this.clickPrev} title="left arrow"><i className="fa fa-chevron-left fa-5x"></i></div>
                <div className="control" onClick={this.clickNext} title="right arrow"><i className="fa fa-chevron-right fa-5x"></i></div>
            </div>
        );
    },
    clickPrev: function () { actions.prevMedia(); },
    clickNext: function () { actions.nextMedia(); },
    clickShuffle: function () { actions.shuffleMedia(); }
});
