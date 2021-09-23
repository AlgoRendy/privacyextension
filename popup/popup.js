/* eslint-disable no-undef */

window.onload = function () {
  //opens options page on click
  document
    .querySelector("#go-to-options")
    .addEventListener("click", function () {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      }
    });
};
