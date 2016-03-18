var React = require('react');
var SlideStartStopButton = require('./SlideStartStopButton.component.jsx');
var PinInfoUIButton = require('./PinInfoUIButton.component.jsx');
var SlideSettings = require('./SlideSettings.component.jsx');
var actions = require('./actions.js');

module.exports = React.createClass({
    displayName: 'AuxControls',
    render: function () {
        return (
            <div className="aux-panel-container">
                <div className="aux-panel">
                    <fieldset>
                        <legend>slideshow:</legend>
                        <SlideStartStopButton />
                        <button onClick={this.slideShowSettings}><i className="fa fa-cog"></i></button>
                    </fieldset>
                    <fieldset>
                        <legend>info:</legend>
                        <PinInfoUIButton />
                    </fieldset>
                </div>
            </div>
        );
    },
    slideShowSettings: function () {
        actions.showRightPanel(<SlideSettings />);
    }
});
