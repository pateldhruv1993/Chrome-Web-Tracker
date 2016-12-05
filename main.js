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
        chrome.tabs.get(activeTab.tabId, function (tab) {
            console.log(generateLogLine("chrome::focus", tab.id, tab.title, tab.url));
        });
    });

    // Listener for when a tab is created
    chrome.tabs.onCreated.addListener(function (tab){
        console.log(generateLogLine("chrome::created", tab.id, tab.title, tab.url));
    });

    // Listener for when a tab is created
    chrome.tabs.onRemoved.addListener(function (tabId, removeInfo){
        console.log(generateLogLine("chrome::closed", tabId, "", ""));
    });

    /*
    //------- Assuming this code was to detect when the machine goes in "idle" mode. Commenting it out right now as I've found a better way to detect that in the C# Program.


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
    */
}


function generateLogLine(status, tabId, tabTitle, tabUrl){
    return generateDateTimeRFC() + "\t" + status + "\t" + tabId + "\t" + tabTitle + "\t" + tabUrl;
}

// This is the fucntion to create a timestamp that is similar to the one used by C# program so that I don't have to process chrome stuff differently
function generateDateTimeRFC(){
    var daysOfWeek = ["Sun","Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var now = new Date();
    var datetime = daysOfWeek[now.getDay()] + ", " +
                    now.getDate() + " " +
                    monthsOfYear[now.getMonth()] + " " +
                    now.getFullYear() + " " +
                    now.getHours() + ":" +
                    now.getMinutes() + ":" +
                    now.getSeconds() + " " +
                    "GMT";
    return datetime;
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
