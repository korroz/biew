var React = require('react');
var slideStore = require('./slide.store');
var actions = require('./actions');

module.exports = React.createClass({
    displayName: 'SlideStartStopButton',
    getInitialState: function () {
        return { started: false };
    },
    componentDidMount: function () {
        Mousetrap.bind('up', this.startStop);
        this.subs = [
            slideStore.startedObservable().subscribe(this.onStartedChange)
        ];
    },
    componentWillUnmount: function () {
        Mousetrap.unbind(['up']);
        this.subs.forEach(function (sub) { sub.dispose(); });
    },
    render: function () {
        var css = ['fa', this.state.started ? 'fa-stop' : 'fa-play'].join(' ');
        return <button onClick={this.startStop}><i className={css}></i></button>;
    },
    onStartedChange: function (started) {
        this.setState({ started: started });
    },
    startStop: function () {
        if (this.state.started) actions.stopSlide();
        else actions.startSlide();
    }
});
