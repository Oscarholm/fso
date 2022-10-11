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

export const notify = (content, time) => {
  return (dispatch) => {
    dispatch(updateNotification(content));
    setTimeout(() => {
      dispatch(resetNotification());
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
