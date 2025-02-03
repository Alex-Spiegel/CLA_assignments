import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFontSize: "Font Size: 16",
};

const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState,
  reducers: {
    setFontSize: (state, action) => {
      state.selectedFontSize = action.payload;
    },
  },
});

export const { setFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;
