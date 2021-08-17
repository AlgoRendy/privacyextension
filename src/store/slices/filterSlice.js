import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    search: {
      value: "",
    },
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
    method: {
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
    method_GET: (state) => {
      state.method.GET = !state.method.GET;
    },
    method_POST: (state) => {
      state.method.POST = !state.method.POST;
    },
    method_PUT: (state) => {
      state.method.PUT = !state.method.PUT;
    },
    method_DELETE: (state) => {
      state.method.DELETE = !state.method.DELETE;
    },
    method_HEAD: (state) => {
      state.method.HEAD = !state.method.HEAD;
    },
    method_CONNECT: (state) => {
      state.method.CONNECT = !state.method.CONNECT;
    },
    method_OPTIONS: (state) => {
      state.method.OPTIONS = !state.method.OPTIONS;
    },
    method_TRACE: (state) => {
      state.method.TRACE = !state.method.TRACE;
    },
    search_update: (state, action) => {
      state.search.value = action.payload;
    },
  },
});

//Actions to choose from
export const {
  search_update,
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
  method_GET,
  method_POST,
  method_PUT,
  method_DELETE,
  method_HEAD,
  method_CONNECT,
  method_OPTIONS,
  method_TRACE,
} = filterSlice.actions;

export const filterActions = filterSlice.actions;

//Getters
export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
