var React = require('react');
var settingsStore = require('./settings.store');

module.exports = React.createClass({
    displayName: 'SlideSettings',
    getInitialState: function () {
        return { delay: settingsStore.getSlideDelay() };
    },
    componentDidMount: function () {
        this.subs = [
            settingsStore.observable().map(function (s) { return s.slideDelay; })
                .subscribe(this.setDelay)
        ];
    },
    componentWillUnmount: function () {
        this.subs.forEach(function (sub) { sub.dispose(); });
    },
    render: function () {
        return (
            <fieldset>
                <legend>Slide settings</legend>
                <p>
                    The slideshow waits for the <em>Delay</em> duration and, if a video is displayed, that it has
                    played at least once, before moving forward.
                </p>
                <label htmlFor="delay">Delay (ms)</label>
                <input name="delay" onChange={this.onDelayChange} type="number" min="1000" max="60000" value={this.state.delay} step="1000" />
            </fieldset>
        );
    },
    onDelayChange: function (e) { settingsStore.setSlideDelay(Number(e.target.value)); },
    setDelay: function (delay) { this.setState({ delay: delay }); }
});
