import { createSlice } from "@reduxjs/toolkit";
import Graph from "graphology";

export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    updated: 0,
    graph: new Graph(),
  },
  reducers: {
    update_graph: (state) => {
      state.updated += 1;
    },
    update_node: (state, payload) => {},
    update_edge: (state, payload) => {},
    process_new_payload: (state, payload) => {},
  },
});

//Actions to choose from
export const { update_graph, process_new_payload } = graphSlice.actions;

export const graphActions = graphSlice.actions;

//Getters
export const selectGraph = (state) => state.graph.updated;
export const getGraph = (state) => state.graph.graph;

export default graphSlice.reducer;
