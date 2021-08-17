/* eslint-disable no-undef */
var buffer = []
var logging = false;

var counter = 0;

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({'logging': false,'requests': 0})
});


chrome.runtime.onStartup.addListener(() =>{
    // start of each session it sets the the logging variable to false and the amount of reqeuests monitored to zero
    chrome.storage.sync.set({'logging': false,'requests': 0})
})

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    if (logging){
        counter++;
        buffer.push(details);
    }
    return details;
},{urls: ["<all_urls>"]},['requestHeaders', 'extraHeaders'])


setInterval(() => {
    if (counter > 0 && logging) {
        chrome.storage.sync.get(['requests'],res => {
            chrome.storage.sync.set({'requests': res.requests+counter});
            counter = 0;
        });
    }
    
},5000)


chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(function(msg){
        // recieved ping from frontned
        port.postMessage(buffer);
        // clears buffer
        buffer = [];
    })
})




chrome.storage.onChanged.addListener(function(changes) {
    if ('logging' in changes){
        logging = changes.logging.newValue;
    }
});
