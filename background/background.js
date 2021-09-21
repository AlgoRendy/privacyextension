/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const Background = (() => {
  const urlFilter = { urls: ["http://*/*", "https://*/*"] };
  let requests = {};

  const load = (() => {
    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        if (details.tabId < 0) {
          return;
        }

        if (details.hasOwnProperty("requestBody")) {
          delete details.requestBody;
        }

        window.dispatchEvent(
          new CustomEvent("background:main:onRequest", {
            detail: { request: details },
          })
        );
        Background.setRequest(details.requestId, details);

        Background.getCompletedTabFromId(details.tabId, (tab) => {
          Background.setRequest(details.requestId, {
            source: tab.url,
            complete: true,
          });

          Background.getRequest(details.requestId).requestHeaders &&
            Background.getRequest(details.requestId).response &&
            Background.pushToQueue(details.requestId);
        });
      },
      urlFilter,
      ["requestBody"]
    );

    chrome.webRequest.onBeforeSendHeaders.addListener(
      (details) => {
        Background.setRequest(details.requestId, {
          requestHeaders: details.requestHeaders,
        });
        Background.getRequest(details.requestId).complete &&
          Background.getRequest(details.requestId).response &&
          Background.pushToQueue(details.requestId);
      },
      urlFilter,
      ["requestHeaders", "extraHeaders"]
    );

    chrome.webRequest.onResponseStarted.addListener(
      (details) => {
        Background.setRequest(details.requestId, { response: details });

        Background.getRequest(details.requestId).complete &&
          Background.getRequest(details.requestId).requestHeaders &&
          Background.pushToQueue(details.requestId);
      },
      urlFilter,
      ["responseHeaders", "extraHeaders"]
    );

    chrome.webRequest.onCompleted.addListener(
      (details) => Background.setRequest(details.requestId, { success: true }),
      urlFilter
    );

    chrome.webRequest.onErrorOccurred.addListener(
      (details) => Background.setRequest(details.requestId, { success: false }),
      urlFilter
    );

    window.dispatchEvent(
      new CustomEvent("background:main:loaded", { detail: {} })
    );
    return () => true;
  })();

  return {
    isLoaded: () => load(),
    getRequest: (requestId) => requests[requestId],
    setRequest: (requestId, obj) => {
      let tmp = requests[requestId] ? requests[requestId] : {};
      requests[requestId] = Object.assign(tmp, obj);
    },
    pushToQueue: (requestId) => {
      console.log(requestId);
      Requests.add(Background.getRequest(requestId));
      delete Background.getRequest(requestId);
    },
    getCompletedTabFromId: (tabId, callback) => {
      try {
        chrome.tabs.get(tabId, function (tab) {
          if (chrome.runtime.lastError || typeof tab === "undefined") {
            return;
          } else {
            callback(tab);
          }
        });
      } catch (err) {
        if (err) {
          callback(null);
        }
      }
    },
  };
})();
