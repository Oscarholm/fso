import { useState, useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

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
      setErrorMessage(`${user.username} successfully logged in`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      setUser(null);
      blogService.setToken(null);
      window.localStorage.removeItem("loggedBlogAppUser");
      setErrorMessage("successfully logged out");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("logout failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);
      setBlogs(blogs.concat(blog));
      setErrorMessage(`${blogObject.title} by ${blogObject.author} added`);
      blogFormRef.current.toggleVisibility();
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch {
      setErrorMessage("failed to add blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.deleteBlog(blogObject.id);
      const newBlogs = blogs.filter((blog) => blog.id !== blogObject.id);
      setBlogs(newBlogs);
      setErrorMessage(`${blogObject.title} by ${blogObject.author} deleted`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch {
      setErrorMessage("failed to delete blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const likeBlog = async (blogId, blogObject) => {
    await blogService.likeBlog(blogId, blogObject);
  };

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h1>Blogs</h1>
          <form onSubmit={handleLogout}>
            {user.username} is logged in
            <button type="submit">logout</button>
          </form>
          <Notification message={errorMessage} />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
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
      )}
    </div>
  );
};
export default App;
