var React = require('react');
var SlideStartStopButton = require('./SlideStartStopButton.component.jsx');
var PinInfoUIButton = require('./PinInfoUIButton.component.jsx');
var settingsStore = require('./settings.store');

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
                        <PinInfoUIButton />
                    </fieldset>
                </div>
            </div>
        );
    }
});
