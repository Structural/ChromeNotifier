//Counter Initialized to Zero
var i = 0;
(function updateCounter() {
    //Counter Incremented
    var xhr = new XMLHttpRequest();
    xhr.open("GET", getWatercoolrUrl() + "api/v0/conversations/unread_count.json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {

        if (xhr.status >= 300){
            chrome.browserAction.setBadgeBackgroundColor({
                color: "#B22222"
            });
            chrome.browserAction.setBadgeText({
                text: "!"
            });
        }
        else if (xhr.status >= 200){

            // JSON.parse does not evaluate the attacker's scripts.
            var resp = parseInt(xhr.responseText);
           
            if(resp>0){
                //Badge Background color is set to black
                chrome.browserAction.setBadgeBackgroundColor({
                    color: "#000"
                })
                chrome.browserAction.setBadgeText({
                    text: resp.toString()
                });
            }
            else{
                chrome.browserAction.setBadgeText({
                    text: ""
                });
            }
        }
      }
    }
    xhr.send();    

    
    //Used timeout with same interval
    setTimeout(updateCounter, 60000);
})();

chrome.browserAction.onClicked.addListener(goToInbox);