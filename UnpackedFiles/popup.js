


WC.renderConversatiom = function(conversation){
    retVal = ""
    retVal += "<li class='conversation action-result' "
    retVal += " id='conversation-" + conversation.id + "'"
    retVal += " convoUrl='" + "conversation/" + encodeURIComponent(conversation.title) + "/" + conversation.id + "'"
    retVal += ">"
    retVal += "<div class='conversation-title'>"
    retVal += conversation.title
    retVal += "</div>"
    retVal += "<div class='conversation-participants'>"
    for(participant in conversation.participants)
    {
        retVal += "<span class='conversation-participant'>"
        retVal += conversation.participants[participant].full_name
        retVal += "</span>"
    }
    retVal += "</div>"
    retVal += "</li>"

    return retVal;
};

WC.xmlhttp = new XMLHttpRequest();

WC.run = function(){
    WC.hideAllElements();
    WC.showElement("conversations-loading");
    WC.xmlhttp.onreadystatechange = WC.ajaxReurn;
    WC.xmlhttp.open("GET", WC.getWatercoolrUrl() + "api/v0/conversations/unread.json", true);
    WC.xmlhttp.send();
    document.getElementById("home-link").addEventListener("click",function(){WC.goToInbox();});
};

WC.convoClick = function(e){
    WC.goToInbox(e.target.parentElement.attributes.convoUrl.value);
};

WC.ajaxReurn = function(){
    if (WC.xmlhttp.readyState==4)
    {
        WC.hideAllElements();
        if(WC.xmlhttp.status==200){
            var convoData = JSON.parse(WC.xmlhttp.response);
            if(convoData.length > 0)
            {
                //unread convos
                WC.showElement("conversations");
                rendered_convos = "";
                for(conversation in convoData)
                {
                    rendered_convos += WC.renderConversatiom(convoData[conversation]);
                }
                document.getElementById("conversations-list").innerHTML = rendered_convos;
                for(conversation in convoData)
                {
                    //conversation/watercooler-feedback/79
                    document.getElementById("conversation-" + convoData[conversation].id).addEventListener("click",WC.convoClick);
                }
            }
            if(convoData.length == 0)
            {
                //no unread convos
                WC.showElement("conversations-empty");
            }
            WC.refreshCounter();
        }
        else if(WC.xmlhttp.status==401)
        {
            // need to log in.
            WC.showElement("conversations-login");
        }
        else
        {
            WC.showElement("conversations-error");
        }
    }
};

WC.hideAllElements = function(){
    $(".is-visible").removeClass("is-visible");
}

WC.showElement = function(elementID){
    $("#"+elementID).addClass("is-visible");
}





WC.run();
