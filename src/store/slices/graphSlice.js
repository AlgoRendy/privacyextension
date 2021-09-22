import { createSlice } from "@reduxjs/toolkit";
export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    updated: 0,
  },
  reducers: {
    update_graph: (state) => {
      state.updated += 1;
    },
  },
});

//Actions to choose from
export const { update_graph } = graphSlice.actions;

export const graphActions = graphSlice.actions;

//Getters
export const selectGraph = (state) => state.graph.updated;

export default graphSlice.reducer;
