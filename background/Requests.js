/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Requests = (() => {
  let requestsQueue = [];
  let chunkSize = 20;

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
    let chunk;
    chunk = {
      requests: JSON.stringify(requests),
    };
    let chunkWrap = {};
    let currentId = Date.now();
    chunkWrap[currentId] = chunk;

    chrome.storage.local.set(chunkWrap, () => {
      chrome.storage.local.get("indexes", (result) => {
        if (result.hasOwnProperty("indexes")) {
          result.indexes.push(currentId);
        } else {
          result.indexes = [currentId];
        }
        chrome.storage.local.set(result, null);
      });
    });

    chrome.runtime.sendMessage({ requests: requests });
  };
  return {
    add: (request) => {
      requestsQueue.push(request);
      requestsQueue.length >= chunkSize && scheduleWorker(0);
    },
  };
})();
