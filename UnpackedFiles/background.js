//Counter Initialized to Zero
var i = 0;
(function updateCounter() {
        

    WC.refreshCounter();
    //Used timeout with same interval
    setTimeout(updateCounter, 60000);
})();

chrome.browserAction.onClicked.addListener(WC.goToInbox);