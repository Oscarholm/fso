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
    addLike(state, action) {
      const changedBlog = action.payload;
      const id = changedBlog.id;
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
  },
});

export const like = (objectId, blogObject) => {
  return async (dispatch) => {
    const newObject = {
      ...blogObject,
      likes: blogObject.likes + 1,
    };
    dispatch(addLike(newObject));
    await blogService.likeBlog(objectId, newObject);
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    let blog = await blogService.create(blogObject);
    dispatch(appendBlog(blog));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogService.getAll();
    blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
export const { appendBlog, setBlogs, addLike } = blogSlice.actions;
