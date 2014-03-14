
var WC = {};

WC.renderConversatiom = function(conversation){
    retVal = ""
    retVal += "<li class='conversation action-result' "
    retVal += " id='conversation-" + conversation.id + "'"
    retVal += " convoUrl='" + "conversation/" + encodeURIComponent(conversation.title) + "/" + conversation.id + "'"
    retVal += ">"
    retVal += "<div class='conversation-title'>"
    retVal += conversation.title
    retVal += "</div><div class='conversation-participants'>"
    retVal += "Participants"
    retVal += "</div></li>"

    return retVal;
};

WC.xmlhttp = new XMLHttpRequest();

WC.run = function(){
    WC.xmlhttp.onreadystatechange = WC.ajaxReurn;
    WC.xmlhttp.open("GET", getWatercoolrUrl() + "api/v0/conversations/unread.json", true);
    WC.xmlhttp.send();
    document.getElementById("footer").addEventListener("click",function(){goToInbox();});
};

WC.convoClick = function(e){
    goToInbox(e.target.parentElement.attributes.convoUrl.value);
};

WC.ajaxReurn = function(){
    if (WC.xmlhttp.readyState==4 && WC.xmlhttp.status==200)
    {
        var convoData = JSON.parse(WC.xmlhttp.response);
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
};






WC.run();
