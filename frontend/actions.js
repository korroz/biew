var dispatcher = require('./dispatcher');

module.exports = new Actions(dispatcher);

function Actions(dispatcher)
{
    var self = this;

    self.nextMedia = nextMedia;
    self.prevMedia = prevMedia;
    self.shuffleMedia = shuffleMedia;
    self.startSlide = startSlide;
    self.stopSlide = stopSlide;
    self.showRightPanel = showRightPanel;
    self.hideRightPanel = hideRightPanel;

    function nextMedia() {
        dispatcher.dispatch({ actionType: 'cursor:next' });
    }
    function prevMedia() {
        dispatcher.dispatch({ actionType: 'cursor:prev' });
    }
    function shuffleMedia() {
        dispatcher.dispatch({ actionType: 'media:shuffle' });
    }
    function startSlide() {
        dispatcher.dispatch({ actionType: 'slide:start' });
    }
    function stopSlide() {
        dispatcher.dispatch({ actionType: 'slide:stop' });
    }
    function showRightPanel(jsx) {
        dispatcher.dispatch({ actionType: 'right-panel:show', content: jsx });
    }
    function hideRightPanel() {
        dispatcher.dispatch({ actionType: 'right-panel:hide' });
    }
}
