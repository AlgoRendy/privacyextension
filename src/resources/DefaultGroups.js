import Util from "../components/model/Util.js";

import duckDuckGoTracker from "./DuckDuckGoTracker.js";
import easyPrivacyTracker from "./EasyPrivacyTracker.js";

// TODO:  missing Disconnect.me, Ghostery, maybe others
export default [{
  label: "All",
  members: [{
    id: Util.randomString(),
    label: "All requests",
    filter: () => true,
  }]}, {
  label: "DuckDuckGo Radar",
  members: [{
    id: Util.randomString(),
    label: "DuckDuckGo Non-tracker",
    filter: (r) => !Util.isTracker(new URL(r.url).hostname, duckDuckGoTracker),
  }, {
    id: Util.randomString(),
    label: "DuckDuckGo Tracker",
    filter: (r) => Util.isTracker(new URL(r.url).hostname, duckDuckGoTracker),
  }]}, {
  label: "EasyPrivacy",
  members: [{
    id: Util.randomString(),
    label: "EasyPrivacy Non-tracker",
    filter: (r) => !Util.isTracker(new URL(r.url).hostname, easyPrivacyTracker),
  }, {
    id: Util.randomString(),
    label: "EasyPrivacy Tracker",
    filter: (r) => Util.isTracker(new URL(r.url).hostname, easyPrivacyTracker),
  }]}, 
];