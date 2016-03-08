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
            <div className="buttons">
                <button className="button-primary" onClick={this.clickPrev}>Previous</button>
                <button className="button-primary" onClick={this.clickNext}>Next</button>
            </div>
        );
    },
    clickPrev: function () { actions.prevMedia(); },
    clickNext: function () { actions.nextMedia(); }
});
