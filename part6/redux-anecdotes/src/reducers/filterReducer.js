import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter(state, action) {
      const newState = action.payload;
      return newState;
    },
    resetFilter(state, action) {
      return "";
    },
  },
});

export default filterSlice.reducer;
export const { changeFilter, resetFilter } = filterSlice.actions;
