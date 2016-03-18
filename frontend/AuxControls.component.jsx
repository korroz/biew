var React = require('react');
var actions = require('./actions');

module.exports = React.createClass({
    displayName: 'AuxControls',
    componentDidMount: function () {
        Mousetrap.bind('up', this.startSlide);
        Mousetrap.bind('down', this.stopSlide);
    },
    componentWillUnmount: function () {
        Mousetrap.unbind(['up', 'down']);
    },
    render: function () {
        return (
            <div className="aux-panel-container">
                <div className="aux-panel">
                    <fieldset>
                        <legend>slideshow:</legend>
                        <button><i className="fa fa-play"></i></button>
                        <button><i className="fa fa-cog"></i></button>
                    </fieldset>
                    <fieldset>
                        <legend>info:</legend>
                        <button><i className="fa fa-thumb-tack fa-rotate-90"></i></button>
                    </fieldset>
                </div>
            </div>
        );
    },
    startSlide: function () { actions.startSlide(); },
    stopSlide: function () { actions.stopSlide(); }
});
