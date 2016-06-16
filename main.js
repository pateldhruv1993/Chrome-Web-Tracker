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
        content[i] = {"name": "fagi' - : t", "surname": "duma! fuckat"};
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
        console.log("Probably the server isn't running.");
    });
}






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