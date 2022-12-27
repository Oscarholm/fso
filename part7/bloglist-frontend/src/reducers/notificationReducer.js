import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
    resetNotification() {
      return null;
    },
  },
});

export const setNotifications = (message) => {
  return (dispatch) => {
    dispatch(changeNotification(message));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
export const { changeNotification, resetNotification } =
  notificationSlice.actions;
