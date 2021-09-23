import { createSlice } from "@reduxjs/toolkit";

export const trackingFilterSlice = createSlice({
  name: "trackingFilter",
  initialState: {
    jsImplementation: {},
    manualImplmentation: {},
    currentActive: [],
  },
  reducers: {
    add_jsImplementation: (state, action) => {
      state.jsImplementation[action.payload.name] = action.payload;
    },
    add_manualImplementation: (state, action) => {
      state.manualImplmentation[action.payload.name] = action.payload;
    },
    activateFilter: (state, action) => {
      state.currentActive.push(action.payload);
    },
  },
});

//Actions to choose from
export const { add_jsImplementation, add_manualImplementation } =
  trackingFilterSlice.actions;

export const trackingFilterActions = trackingFilterSlice.actions;

//Getters
export const selectTrackingFilter = (state) => state.trackingFilter || [];

export default trackingFilterSlice.reducer;
