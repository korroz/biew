var React = require('react');
var slideStore = require('./slide.store')

module.exports = React.createClass({
    displayName: 'VidView',
    componentDidMount: function () {
        this.subs = [
            slideStore.controlObservable()
                .do(function () { slideStore.wait(); })
                .delay(5000)
                .subscribe(function () { slideStore.continue(); })
        ];
    },
    componentWillUnmount: function () {
        this.subs.forEach(function (sub) { sub.dispose(); });
    },
    render: function () {
        var output;

        if (this.props.file) {
            output = (
                <video className="keep-aspect-maximize" src={'api/file/' + this.props.file} autoPlay loop controls muted>
                    There should be a video playing here, but seems it doesn't work.
                </video>
            );
        }
        else
            output = <div>No image</div>;
        return output;
    }
});
