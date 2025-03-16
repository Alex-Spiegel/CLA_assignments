import storage from "redux-persist/lib/storage"; // Nutzt localStorage
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // Nur das `token`-Feld speichern
};

export const createPersistedReducer = (reducer) =>
  persistReducer(persistConfig, reducer);
