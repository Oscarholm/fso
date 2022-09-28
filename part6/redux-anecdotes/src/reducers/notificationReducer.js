import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
    resetNotification(state, action) {
      return null;
    },
  },
});

export const { updateNotification, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
