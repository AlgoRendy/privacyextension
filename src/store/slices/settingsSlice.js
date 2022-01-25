import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    linkColors: {
      stylesheet: "#4287f5",
      script: "#f54242",
      main_frame: "#72f542",
      image: "#f5ce42",
      font: "#6b4b05",
      other: "#fcf672",
      ping: "#000000",
      xmlhttprequest: "#bf22bf",
      sub_frame: "#2c22bf",
      csp_report: "#c694e0",
      media: "#5e3275",
    },
    nodeColors: {
      tracking: "#ad3636",
      ntracking: "#9ce340",
    },
    trackingTruthOption: ["EasyPrivacy", "DuckDuckGo", "Both"],
    trackingTruth: "Both",
  },
  reducers: {
    type_stylesheet: (state, action) => {
      state.linkColors.stylesheet = action.payload;
    },
    type_script: (state, action) => {
      state.linkColors.script = action.payload;
    },
    type_main_frame: (state, action) => {
      state.linkColors.main_frame = action.payload;
    },
    type_image: (state, action) => {
      state.linkColors.image = action.payload;
    },
    type_font: (state, action) => {
      state.linkColors.font = action.payload;
    },
    type_other: (state, action) => {
      state.linkColors.other = action.payload;
    },
    type_ping: (state, action) => {
      state.linkColors.ping = action.payload;
    },
    type_xmlhttprequest: (state, action) => {
      state.linkColors.xmlhttprequest = action.payload;
    },
    type_sub_frame: (state, action) => {
      state.linkColors.sub_frame = action.payload;
    },
    type_csp_report: (state, action) => {
      state.linkColors.csp_report = action.payload;
    },
    type_media: (state, action) => {
      state.linkColors.media = action.payload;
    },
    tracking_truth: (state, action) => {
      state.trackingTruth = action.payload;
    },
    node_color_tracking: (state, action) => {
      state.nodeColors.tracking = action.payload;
    },
    node_color_ntracking: (state, action) => {
      state.nodeColors.ntracking = action.payload;
    }
  },
});

//Actions to choose from
export const {
  type_stylesheet,
  type_script,
  type_main_frame,
  type_image,
  type_font,
  type_other,
  type_ping,
  type_xmlhttprequest,
  type_sub_frame,
  type_csp_report,
  type_media,
} = settingsSlice.actions;

export const settingActions = settingsSlice.actions;

//Getters
export const selectSettings = (state) => state.settings;

export default settingsSlice.reducer;
