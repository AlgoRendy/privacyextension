import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import graphReducer from "./slices/graphSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
    graph: graphReducer,
  },
});
