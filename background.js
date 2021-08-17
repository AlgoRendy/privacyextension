/* eslint-disable no-undef */
var buffer = []

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    buffer.push(details);
    return details;
},{urls: ["<all_urls>"]},['requestHeaders', 'extraHeaders'])

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(function(msg){
        // recieved ping from frontned
        port.postMessage(buffer);
        // clears buffer
        buffer = [];
    })
})
