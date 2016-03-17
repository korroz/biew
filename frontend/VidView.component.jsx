var React = require('react');
var slideStore = require('./slide.store')

module.exports = React.createClass({
    displayName: 'VidView',
    getInitialState: function () {
        return { slideStarted: false };
    },
    componentDidMount: function () {
        this.subs = [
            slideStore.controlObservable().subscribe(slideStore.wait),
            slideStore.startedObservable().subscribe(this.onSlideStartedChange)
        ];
    },
    componentWillUnmount: function () {
        this.subs.forEach(function (sub) { sub.dispose(); });
    },
    render: function () {
        var output;

        if (this.props.file) {
            var attr = {};
            if (this.state.slideStarted) attr.onEnded = this.onVideoEnd;
            output = (
                <video
                    {...attr}
                    className="keep-aspect-maximize"
                    src={'api/file/' + this.props.file}
                    autoPlay
                    loop={!this.state.slideStarted}
                    controls
                    muted>
                    There should be a video playing here, but seems it doesn't work.
                </video>
            );
        }
        else
            output = <div>No image</div>;
        return output;
    },
    onSlideStartedChange: function (started) {
        this.setState({ slideStarted: started });
    },
    onVideoEnd: function (e) {
        slideStore.continue();
        e.target.currentTime = 0;
        e.target.play();
    }
});
