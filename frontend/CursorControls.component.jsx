var React = require('react');
var dispatcher = require('./dispatcher');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <button onClick={this.clickPrev}>Previous</button>
                <button onClick={this.clickNext}>Next</button>
            </div>
        );
    },
    clickPrev: function () {
        dispatcher.dispatch({ actionType: 'cursor:prev' });
    },
    clickNext: function () {
        dispatcher.dispatch({ actionType: 'cursor:next' });
    }
});
