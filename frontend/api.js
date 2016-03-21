var xhr = require('xhr');
var Rx = require('rx');

module.exports = new API(xhr, Rx);

function API(xhr, Rx) {
    var self = this;

    var xhrRx = Rx.Observable.fromCallback(xhr, null, function (err, response, body) {
        if (err) throw err;
        return response;
    });

    self.getMedia = getMedia;

    function getMedia() {
        return xhrRx('api/media').map(function (response) {
            if (response.statusCode !== 200) throw response;
            return JSON.parse(response.body);
        });
    }
}
