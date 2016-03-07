var React = require('react');

module.exports = React.createClass({
    displayName: 'VidView',
    render: function () {
        var output;

        if (this.props.file) {
            output = (
                <video className="keep-aspect-maximize" src={'api/file/' + this.props.file} autoPlay loop controls>
                    There should be a video playing here, but seems it doesn't work.
                </video>
            );
        }
        else
            output = <div>No image</div>;
        return output;
    }
});
