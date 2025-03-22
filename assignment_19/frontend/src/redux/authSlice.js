// Ein Slice kombiniert den Zustand (state) und die zugehörigen Aktionen (actions).
// Slices gehören zum Toolkit und vereinfachen "the old way"
import { createSlice } from "@reduxjs/toolkit";

// kreiert das Slice, welches den state (isAuthenticated) verwaltet
const authSlice = createSlice({
  name: "auth", // string name to identify the slice (required)
  initialState: {
    isAuthenticated: false, // Anfangswert (required) wird hier definiert (user ist anfangs nicht eingeloggt)
    token: null,
  },

  // hier endlich stehen die Funktionen (mindestens 1, required), die den state verändern
  // Reducers are functions that take the current state and an action as arguments, and return a new state result
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    initializeAuth(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
});

// das hier sind die sog. "action creators". Die werden hier exportiert, damit man sie woanders callen kann
export const { login, logout, setToken, clearToken, initializeAuth } =
  authSlice.actions;
export default authSlice.reducer;
