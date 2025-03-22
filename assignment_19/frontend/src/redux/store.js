import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // importing the slice here
import darkModeReducer from "./darkModeSlice";
import { gqlApi } from "../api/gqlApi";

// configureStore richtet den Store ein. MUSS configureStore sein.
const store = configureStore({
  // hier wird das Slice im store eingebunden. jeder reducer bekommt einen eigenen Schlüssel im store
  reducer: {
    auth: authReducer, //auth-Logik
    darkMode: darkModeReducer, // darkMode-Logik:
    [gqlApi.reducerPath]: gqlApi.reducer, // GraphQL-API in den Store integrieren
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gqlApi.middleware), // Middleware für RTK Query
});

export default store;
