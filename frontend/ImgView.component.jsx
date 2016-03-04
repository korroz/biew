var React = require('react');

module.exports = React.createClass({
    render: function () {
        var output;

        if (this.props.file)
            output = <img src={'api/file/' + this.props.file} />;
        else
            output = <div>No image</div>;
        return output;
    }
});
