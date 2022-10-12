import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    updateNotification(state, action) {
      console.log("updateNotification payload: ", action.payload);
      return {
        content: action.payload.content,
        timeoutID: action.payload.timeoutID,
      };
    },
    resetNotification(state, action) {
      return null;
    },
  },
  // need to create a state of timeoutID
  // with that, we can then reset timeOuts using clearTimeout(timeoutID)
});

export const { updateNotification, resetNotification } =
  notificationSlice.actions;

export const notify = (content, time) => {
  return (dispatch) => {
    const timeoutID = setTimeout(() => {
      dispatch(resetNotification());
    }, time * 1000);
    dispatch(updateNotification({ content, timeoutID }));
    return timeoutID;
  };
};
export default notificationSlice.reducer;
