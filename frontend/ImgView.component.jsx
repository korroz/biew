var React = require('react');

module.exports = React.createClass({
    displayName: 'ImgView',
    render: function () {
        var output;

        if (this.props.file)
            output = <img className="keep-aspect-maximize" src={'api/file/' + this.props.file} />;
        else
            output = <div>No image</div>;
        return output;
    }
});
