import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotifications } from "./notificationReducer";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setReduxUser(state, action) {
      return action.payload;
    },
    resetReduxUser() {
      return null;
    },
  },
});

export const setUser = (loggedUserJSON) => {
  return async (dispatch) => {
    const user = JSON.parse(loggedUserJSON);
    dispatch(setReduxUser(user));
    blogService.setToken(user.token);
  };
};

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setReduxUser(user));
      dispatch(setNotifications(`${user.username} successfully logged in`));
    } catch (err) {
      dispatch(setNotifications("wrong credentials"));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(resetReduxUser());
      blogService.setToken(null);
      window.localStorage.removeItem("loggedBlogAppUser");
      dispatch(setNotifications("successfully logged out"));
    } catch (err) {
      dispatch(setNotifications("logout failed"));
    }
  };
};

export const { setReduxUser, resetReduxUser } = userSlice.actions;

export default userSlice.reducer;
