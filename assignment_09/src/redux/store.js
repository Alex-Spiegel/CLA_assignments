import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // importing the slice here
import darkModeReducer from "./darkModeSlice";

// configureStore richtet den Store ein. MUSS configureStore sein.
const store = configureStore({
  // hier wird das Slice im store eingebunden. jeder reducer bekommt einen eigenen Schlüssel im store
  reducer: {
    auth: authReducer, //auth-Logik
    darkMode: darkModeReducer, // darkMode-Logik:
  },
});

export default store;
