var dispatcher = require('./dispatcher');

module.exports = new Actions(dispatcher);

function Actions(dispatcher)
{
    var self = this;

    self.nextMedia = nextMedia;
    self.prevMedia = prevMedia;
    self.startSlide = startSlide;
    self.stopSlide = stopSlide;

    function nextMedia() {
        dispatcher.dispatch({ actionType: 'cursor:next' });
    }
    function prevMedia() {
        dispatcher.dispatch({ actionType: 'cursor:prev' });
    }
    function startSlide() {
        dispatcher.dispatch({ actionType: 'slide:start' });
    }
    function stopSlide() {
        dispatcher.dispatch({ actionType: 'slide:stop' });
    }
}
