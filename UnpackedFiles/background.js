//Counter Initialized to Zero
var i = 0;
(function updateCounter() {
    //Counter Incremented
    var xhr = new XMLHttpRequest();
    xhr.open("GET", getWatercoolrUrl() + "api/v0/topics.json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status >= 500 && xhr.status < 600){
            chrome.browserAction.setIcon({path: "logo-red.png"});
            chrome.browserAction.setBadgeBackgroundColor({
                color: "#B22222"
            });
            chrome.browserAction.setBadgeText({
                text: "!!!!"
            });
        }
        else if (xhr.status >= 200 && xhr.status < 300){

            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
            var txt = 0;
            //Counter is set to Badge
            for (x in resp)
            {
                txt = txt + resp[x]["unread_conversations"].length;
            }
            if(txt>0){
                chrome.browserAction.setIcon({path: "logo-full.png"});
                //Badge Background color is set to black
                chrome.browserAction.setBadgeBackgroundColor({
                    color: "#000"
                })
                chrome.browserAction.setBadgeText({
                    text: txt.toString()
                });
            }
            else{
                chrome.browserAction.setIcon({path: "logo-empty.png"});
                chrome.browserAction.setBadgeText({
                    text: ""
                });
            }
        }
      }
    }
    xhr.send();    

    
    //Used timeout with same interval
    setTimeout(updateCounter, 2000);
})();


function getWatercoolrUrl() {
  return "http://watercoolr.io/";
}

function isWatercoolrUrl(url) {
  // Return whether the URL starts with the Gmail prefix.
  return url.indexOf(getWatercoolrUrl()) == 0;
}


function goToInbox() {
  console.log('Going to inbox...');
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isWatercoolrUrl(tab.url)) {
        console.log('Found Watercoolr tab: ' + tab.url + '. ' +
                    'Focusing and refreshing count...');
        chrome.tabs.update(tab.id, {selected: true});
        startRequest({scheduleRequest:false, showLoadingAnimation:false});
        return;
      }
    }
    console.log('Could not find Watercoolr tab. Creating one...');
    chrome.tabs.create({url: getWatercoolrUrl()});
  });
}



chrome.browserAction.onClicked.addListener(goToInbox);