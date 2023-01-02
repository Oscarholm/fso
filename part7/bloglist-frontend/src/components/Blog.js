import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, like } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [blogVisible, setBlogVisible] = useState(false);
  const hideWhenVisible = { display: blogVisible ? "none" : "" };
  const showWhenVisible = { display: blogVisible ? "" : "none" };

  /* when new blog is created, the returned "blog.user" object is the same as
  blog.user.id in the database. So newly created blogs don't show any "remove"
  button until the page has been updated. This has to do with how MongoDB models
  work, so my shameful solution is to check for both cases. */
  const removeButton = {
    display: user.id === blog.user.id || user.id === blog.user ? "" : "none",
  };

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible);
  };

  const handleRemove = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const handleLike = (event) => {
    event.preventDefault();
    const blogId = blog.id;
    dispatch(like(blogId, blog));
  };

  return (
    <div className="blog">
      <div className="blogHeader" style={hideWhenVisible}>
        {blog.title} {blog.author}
        &nbsp;<button onClick={toggleVisibility}>view</button>
      </div>
      <div className="blogDetails" style={showWhenVisible}>
        <div style={blogStyle}>
          {blog.title}
          &nbsp;<button onClick={toggleVisibility}>hide</button>
          <br />
          {blog.url} <br />
          likes {blog.likes}{" "}
          <button id="like-button" onClick={handleLike}>
            like
          </button>
          <br />
          {blog.author} <br />
          <button style={removeButton} onClick={handleRemove}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
