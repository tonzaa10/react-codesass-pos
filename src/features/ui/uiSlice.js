import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = action.payload;
    },
    clearAlert(state) {
      state.alert = null;
    },
  },
});

export default uiSlice.reducer;
export const { setAlert, clearAlert } = uiSlice.actions;
