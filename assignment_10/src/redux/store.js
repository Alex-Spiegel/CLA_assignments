import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice";
import fontSizeReducer from "./fontSizeSlice";
export const store = configureStore({
  reducer: {
    language: languageReducer,
    fontSize: fontSizeReducer,
  },
});
