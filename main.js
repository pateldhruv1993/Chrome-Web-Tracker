var handShakeConfirmed;     // Variable that will store true if the program is in handshake state with the TCPServer
var tcpClient;              // Object to store the tcp client

if(!localStorage.tcpServerAddress){
    localStorage.tcpServerAddress = "127.0.0.1"
}

if(!localStorage.tcpServerPort){
    localStorage.tcpServerPort = 6969
}


if(!localStorage.sites){
    localStorage.sites = {}
}



// MAIN. Runs on document load
$(function(){
    var content = {};
    for(var i = 0; i < 10 ; i++){
        content[i] = {"name": "fagit", "surname": "fagit"};
    }
    sendDataToTCP(content);
});


function sendDataToTCP(content){
    var request = $.ajax({
      url: "http://" + localStorage.tcpServerAddress + ":" +localStorage.tcpServerPort,
      method: "POST",
      data: content,
      dataType: "json"
    });

    request.done(function( receivedData ) {
      console.log( receivedData );
    });

    request.fail(function( jqXHR, textStatus ) {
      console.log( "Request failed: " + textStatus );
    });
}
/*
var http = new XMLHttpRequest();
var url = "http://127.0.0.1:6969/";
var params = "lorem=ipsum&name=binny";
http.open("POST", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
    }
}
http.send(params);
*/







/*


// Function to process commands from TCP Server
function processTCPCommand(cmd){
    if(handShakeConfirmed){
        
        
        if(cmd == "SEND_NEW_LOGS"){
            sendNewLogs();
        } else{
            tcpClient.sendMessage("UNKNOWN_CMD",function(){});
        }
        
        
    }
    else{
        if(cmd == "Sup!"){
            handShakeConfirmed = true;
            tcpClient.sendMessage("HANDSHAKE_CONFIRMED",function(){});
        } else{
            tcpClient.sendMessage("WRONG_HANDSHAKE_MSG",function(){});
            tcpClient.disconnect();
        }
    }
}




//TCP Client
//tcpClient = new TcpClient(localStorage.tcpServerAddress, parseInt(localStorage.tcpServerPort));


tcpClient.connect(function(){
    
    // Send the handshake message and set variables to detect if program is in handshake state
    tcpClient.sendMessage("Web_Tracker_Handshake");
    handShakeConfirmed = false;
    
    
    tcpClient.addResponseListener(function(data){
        processTCPCommand(data);
    });
});



*/