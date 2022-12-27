import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    let blog = await blogService.create(blogObject);
    console.log(blog);
    dispatch(appendBlog(blog));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogService.getAll();
    blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    console.log("in initializeBlogs: ", blogs);
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
export const { appendBlog, setBlogs } = blogSlice.actions;
