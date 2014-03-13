function getWatercoolrUrl() {
  return "http://watercooler.io/";
}

function isWatercoolrUrl(url) {
  // Return whether the URL starts with the Gmail prefix.
  return url.indexOf(getWatercoolrUrl()) == 0;
}


function goToInbox(url) {
  console.log('Going to inbox...');
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isWatercoolrUrl(tab.url)) {
        console.log('Found Watercoolr tab: ' + tab.url + '. ' +
                    'Focusing and refreshing count...');
        if(url){
          chrome.tabs.update(tab.id, {selected: true,url: getWatercoolrUrl() + url});
        }
        else{
          chrome.tabs.update(tab.id, {selected: true});
        }
        startRequest({scheduleRequest:false, showLoadingAnimation:false});
        return;
      }
    }
    console.log('Could not find Watercoolr tab. Creating one...');
    chrome.tabs.create({url: url ? getWatercoolrUrl() + url : getWatercoolrUrl()});
  });
}