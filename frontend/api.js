var xhr = require('xhr');
var q = require('q');

module.exports = new API(xhr, q);

function API(xhr, q) {
    var self = this;

    self.getMedia = getMedia;

    function getMedia() {
        return q.Promise(function (resolve, reject) {
            xhr('api/media', function (err, response) {
                if (err)
                    reject(err);
                else if (response.statusCode === 200)
                    resolve(JSON.parse(response.body));
                else
                    reject(response);
            });
        });
    }
}
