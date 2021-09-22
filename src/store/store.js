import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import graphReducer from "./slices/graphSlice";
import settingsReducer from "./slices/settingsSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
    graph: graphReducer,
    settings: settingsReducer,
  },
});
