import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    type: {
      stylesheet: true,
      script: true,
      main_frame: true,
      image: true,
      font: true,
      other: true,
      ping: true,
      xmlhttprequest: true,
      sub_frame: true,
      csp_report: true,
      media: true,
    },
    methode: {
      GET: true,
      POST: true,
      PUT: true,
      DELETE: true,
      HEAD: true,
      CONNECT: true,
      OPTIONS: true,
      TRACE: true,
    },
  },
  reducers: {
    type_stylesheet: (state) => {
      state.type.stylesheet = !state.type.stylesheet;
    },
    type_script: (state) => {
      state.type.script = !state.type.script;
    },
    type_main_frame: (state) => {
      state.type.main_frame = !state.type.main_frame;
    },
    type_image: (state) => {
      state.type.image = !state.type.image;
    },
    type_font: (state) => {
      state.type.font = !state.type.font;
    },
    type_other: (state) => {
      state.type.other = !state.type.other;
    },
    type_ping: (state) => {
      state.type.ping = !state.type.ping;
    },
    type_xmlhttprequest: (state) => {
      state.type.xmlhttprequest = !state.type.xmlhttprequest;
    },
    type_sub_frame: (state) => {
      state.type.sub_frame = !state.type.sub_frame;
    },
    type_csp_report: (state) => {
      state.type.csp_report = !state.type.csp_report;
    },
    type_media: (state) => {
      state.type.media = !state.type.media;
    },
    methode_GET: (state) => {
      state.methode.GET = !state.methode.GET;
    },
    methode_POST: (state) => {
      state.methode.POST = !state.methode.POST;
    },
    methode_PUT: (state) => {
      state.methode.PUT = !state.methode.PUT;
    },
    methode_DELETE: (state) => {
      state.methode.DELETE = !state.methode.DELETE;
    },
    methode_HEAD: (state) => {
      state.methode.HEAD = !state.methode.HEAD;
    },
    methode_CONNECT: (state) => {
      state.methode.CONNECT = !state.methode.CONNECT;
    },
    methode_OPTIONS: (state) => {
      state.methode.OPTIONS = !state.methode.OPTIONS;
    },
    methode_TRACE: (state) => {
      state.methode.TRACE = !state.methode.TRACE;
    },
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
  methode_GET,
  methode_POST,
  methode_PUT,
  methode_DELETE,
  methode_HEAD,
  methode_CONNECT,
  methode_OPTIONS,
  methode_TRACE,
} = filterSlice.actions;

export const filterActions = filterSlice.actions;

//Getters
export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
