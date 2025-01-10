import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // importing the slice here

// configureStore richtet den Store ein. MUSS configureStore sein.
const store = configureStore({
  // hier wird das Slice im store eingebunden
  reducer: {
    auth: authReducer,
  },
});

export default store;
