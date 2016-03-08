var dispatcher = require('./dispatcher');

module.exports = new Actions(dispatcher);

function Actions(dispatcher)
{
    var self = this;

    self.nextMedia = nextMedia;
    self.prevMedia = prevMedia;

    function nextMedia() {
        dispatcher.dispatch({ actionType: 'cursor:next' });
    }
    function prevMedia() {
        dispatcher.dispatch({ actionType: 'cursor:prev' });
    }
}
