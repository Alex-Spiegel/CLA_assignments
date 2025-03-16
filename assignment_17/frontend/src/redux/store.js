import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import languageReducer from "./languageSlice";
import fontSizeReducer from "./fontSizeSlice";
import authReducer from "./authSlice"; // Jetzt bereits persistiert

export const store = configureStore({
  reducer: {
    language: languageReducer,
    fontSize: fontSizeReducer,
    auth: authReducer, // Persistierter Auth-Reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Wichtig für persist/PERSIST Action!
    }),
});

export const persistor = persistStore(store);
