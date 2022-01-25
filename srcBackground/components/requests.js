/* eslint-disable no-undef */
module.exports = Requests = (Calculator) =>
  (() => {
    let requestsQueue = [];
    let chunkSize = 20;
    let port = undefined;

    chrome.runtime.onConnect.addListener((connectedPort) => {
      console.log("Front-End Connected");
      port = connectedPort;
    });

    let scheduleWorker = (delay) => setTimeout(updateRequests, delay);

    let updateRequests = () => {
      let requestsToUpdate = requestsQueue.filter((e) => e.complete);

      if (requestsToUpdate.length < chunkSize) {
        return;
      }
      requestsQueue = requestsQueue.filter((e) => !e.complete);
      pushRequests(requestsToUpdate);
    };

    let pushRequests = (requests) => {
      Calculator.addToGraph({ requests: requests });
      port && port.postMessage({ requests: requests });
    };
    return {
      add: (request) => {
        requestsQueue.push(request);
        requestsQueue.length >= chunkSize && scheduleWorker(0);
      },
    };
  })();
