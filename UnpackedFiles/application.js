var WC = {};

WC.getWatercoolrUrl = function () {
  return "http://watercooler.io/";
}

WC.isWatercoolrUrl = function (url) {
  // Return whether the URL starts with the Gmail prefix.
  return url.indexOf(WC.getWatercoolrUrl()) == 0;
}


WC.goToInbox = function(url) {
  console.log('Going to inbox...');
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && WC.isWatercoolrUrl(tab.url)) {
        console.log('Found Watercoolr tab: ' + tab.url + '. ' +
                    'Focusing and refreshing count...');
        if(url){
          chrome.tabs.update(tab.id, {selected: true,url: WC.getWatercoolrUrl() + url});
        }
        else{
          chrome.tabs.update(tab.id, {selected: true});
        }
        startRequest({scheduleRequest:false, showLoadingAnimation:false});
        return;
      }
    }
    console.log('Could not find Watercoolr tab. Creating one...');
    chrome.tabs.create({url: url ? WC.getWatercoolrUrl() + url : WC.getWatercoolrUrl()});
  });
}

WC.refreshCounter = function(){
  //Counter Incremented
    var xhr = new XMLHttpRequest();
    xhr.open("GET", WC.getWatercoolrUrl() + "api/v0/conversations/unread_count.json", true);
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
}