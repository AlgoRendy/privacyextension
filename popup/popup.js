/* eslint-disable no-undef */

window.onload = function () {
  chrome.storage.sync.get(["logging", "requests"], (res) => {
    document.getElementById("switch-id").checked = res.logging;
    document.getElementById("requests_amount").innerText = res.requests;
  });
  
  // start of each session it sets the the logging variable to false and the amount of reqeuests monitored to zero
  document.getElementById("switch-id").onchange = function () {
    let checkbox = document.getElementById("switch-id");
    chrome.storage.sync.set({ logging: checkbox.checked, requests: 0 });
  };

  //opens options page on click
  document
    .querySelector("#go-to-options")
    .addEventListener("click", function () {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      }
    });

  // Updates frontend with storage values
  chrome.storage.onChanged.addListener(function (changes) {
    if ("logging" in changes) {
        document.getElementById("switch-id").checked = changes.logging.newValue;
      }
    if ("requests" in changes) {
      document.getElementById("requests_amount").innerText = changes.requests.newValue;
    }
  });
};
