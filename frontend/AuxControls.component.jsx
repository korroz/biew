var React = require('react');
var SlideStartStopButton = require('./SlideStartStopButton.component.jsx');

module.exports = React.createClass({
    displayName: 'AuxControls',
    render: function () {
        return (
            <div className="aux-panel-container">
                <div className="aux-panel">
                    <fieldset>
                        <legend>slideshow:</legend>
                        <SlideStartStopButton />
                        <button><i className="fa fa-cog"></i></button>
                    </fieldset>
                    <fieldset>
                        <legend>info:</legend>
                        <button><i className="fa fa-thumb-tack fa-rotate-90"></i></button>
                    </fieldset>
                </div>
            </div>
        );
    }
});
