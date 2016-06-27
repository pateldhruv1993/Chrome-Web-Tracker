//--------------------------------------------------------
//                 Class Variables
//--------------------------------------------------------
var handshakeConfirmed = false; // Variable that will store true if the program is in handshake state with the TCPServer
var handshakeVerificationMessage = "Procrast_Electron_Handshake" // The message the server should give you when you receive data for the first time from that server
var tcpClient; // Object to store the tcp client


if (!localStorage.tcpServerAddress) {
    localStorage.tcpServerAddress = "127.0.0.1"
}

if (!localStorage.tcpServerPort) {
    localStorage.tcpServerPort = 6969
}

if (!localStorage.sites) {
    localStorage.sites = {}
}







//----------------------------------------------------------
//                   Main app Flow
//----------------------------------------------------------

initListeners();












//-----------------------------------------------------------
//                    Function Defination
//-----------------------------------------------------------
function initListeners() {

    // Listener for when a tab is activated
    chrome.tabs.onActivated.addListener(function (activeTab) {
        console.log(activeTab);
        chrome.tabs.get(activeTab.tabId, function (tab) {
            console.log(tab.url);
        });
    });



    // Force a check of the idle state to ensure that we transition
    // back from idle to active as soon as possible.
    chrome.idle.queryState(60, function (idleState) {
        if (idleState == "active") {
            config.idle = false;
        } else {
            config.idle = true;
        }
    });


    // Listener for idle and stuff
    chrome.idle.onStateChanged.addListener(function (idleState) {
        if (idleState == "active") {
            config.idle = false;
            self._updateTimeWithCurrentTab();
        } else {
            config.idle = true;
            self._sites.setCurrentFocus(null);
        }
    });
}



/*----------------------------------------------------------
    NETWORKING STUFF - SEEMS TO WORK WHEN COMMENTED OUT
/-----------------------------------------------------------




// MAIN. Runs on document load
$(function () {



    var content = {};
    for (var i = 0; i < 10; i++) {
        content[i] = {
            "name": "fagi' - : t"
            , "surname": "duma! fuckat"
        };
    }
    sendDataToTCP(content);
});



function sendDataToTCP(content) {
    var jsonString = JSON.stringify(content);

    var request = $.ajax({
        url: "http://" + localStorage.tcpServerAddress + ":" + localStorage.tcpServerPort
        , method: "POST"
        , data: jsonString
    });

    request.done(function (receivedData) {

        // Process received data

        if (receivedData == "SEND_LAST_10") {
            sendLog(10);
        } else if (receivedData == "SEND_LAST_5") {
            sendLog(5);
        }

    });

    request.fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
        console.log("Probably the server isn't running.");
    });
}



// Function that will extract the required data from the cummulitive logs and send
function sendLog(numOfLogEntriesToSend) {
    sendDataToTCP(last10Entries, "SENDING_REQUESTED_DATA");
}
*/