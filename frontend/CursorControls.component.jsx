var React = require('react');
var actions = require('./actions');

module.exports = React.createClass({
    displayName: 'CursorControls',
    componentDidMount: function () {
        Mousetrap.bind('left', this.clickPrev);
        Mousetrap.bind('right', this.clickNext);
        Mousetrap.bind('up', this.startSlide);
        Mousetrap.bind('down', this.stopSlide);
    },
    componentWillUnmount: function () {
        Mousetrap.unbind(['left', 'right', 'up', 'down']);
    },
    render: function () {
        return (
            <div className="controls">
                <div className="control prev-control" onClick={this.clickPrev}><i className="fa fa-chevron-left fa-5x"></i></div>
                <div className="control next-control" onClick={this.clickNext}><i className="fa fa-chevron-right fa-5x"></i></div>
            </div>
        );
    },
    clickPrev: function () { actions.prevMedia(); },
    clickNext: function () { actions.nextMedia(); },
    startSlide: function () { actions.startSlide(); },
    stopSlide: function () { actions.stopSlide(); }
});
