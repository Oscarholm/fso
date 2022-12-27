import { useState, useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "./reducers/notificationReducer";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";

// Next step is to fix create blog with redux store

const App = () => {
  const [setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);
  console.log("from app.js ", blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(setNotifications(`${user.username} successfully logged in`));
    } catch (exception) {
      dispatch(setNotifications("wrong credentials"));
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      setUser(null);
      blogService.setToken(null);
      window.localStorage.removeItem("loggedBlogAppUser");
      dispatch(setNotifications("successfully loggedout"));
    } catch (exception) {
      dispatch(setNotifications("logout failed"));
    }
  };

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    try {
      console.log("this is the blogObject: ", blogObject);
      dispatch(createBlog(blogObject));
      dispatch(
        setNotifications(`${blogObject.title} by ${blogObject.author} added`)
      );
      blogFormRef.current.toggleVisibility();
    } catch (err) {
      dispatch(setNotifications("failed to add blog"));
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.deleteBlog(blogObject.id);
      const newBlogs = blogs.filter((blog) => blog.id !== blogObject.id);
      setBlogs(newBlogs);
      dispatch(
        setNotifications(`${blogObject.title} by ${blogObject.author} deleted`)
      );
    } catch (err) {
      dispatch(setNotifications("failed to delete blog"));
    }
  };

  const likeBlog = async (blogId, blogObject) => {
    await blogService.likeBlog(blogId, blogObject);
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          errorMessage={notification}
        />
      ) : (
        <div>
          <h1>Blogs</h1>
          <form onSubmit={handleLogout}>
            {user.username} is logged in
            <button type="submit">logout</button>
          </form>
          <Notification message={notification} />
          <Togglable id="new-blog" buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                deleteBlog={deleteBlog}
                user={user}
                likeBlog={likeBlog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
