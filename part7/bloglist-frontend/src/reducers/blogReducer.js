import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotifications } from "./notificationReducer";
// import { setNotifications } from "./notificationReducer";

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
    updateBlog(state, action) {
      const changedBlog = action.payload;
      const id = changedBlog.id;
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    removeBlog(state, action) {
      const id = action.payload.id;
      const newArray = state.filter((blog) => blog.id !== id);
      console.log("This is the new array ", newArray);
      return newArray;
    },
  },
});

export const like = (objectId, blogObject) => {
  return async (dispatch) => {
    const newObject = {
      ...blogObject,
      likes: blogObject.likes + 1,
    };
    dispatch(updateBlog(newObject));
    await blogService.likeBlog(objectId, newObject);
  };
};

export const addComment = (blogObject, comment) => {
  return async (dispatch) => {
    const commentObject = await blogService.comment(blogObject.id, { comment });
    const newObject = {
      ...blogObject,
      comments: blogObject.comments.concat(commentObject),
    };
    dispatch(updateBlog(newObject));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      let blog = await blogService.create(blogObject);
      dispatch(appendBlog(blog));
      dispatch(setNotifications(`Successfully added ${blog.title}`));
    } catch (erro) {
      dispatch(setNotifications("Failed to add new blog post"));
    }
  };
};

export const deleteBlog = (blog) => {
  console.log("deleteBlog receives ", blog);
  return async (dispatch) => {
    try {
      dispatch(removeBlog(blog));
      await blogService.deleteBlog(blog.id);
      dispatch(setNotifications(`Successfully removed ${blog.title}`));
    } catch (err) {
      dispatch(setNotifications(`Failed to remove ${blog.title}`));
    }
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
export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions;
