import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: { value: false }, // Start im Light Mode
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value; // Zustand umschalten
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
