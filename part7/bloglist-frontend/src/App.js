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
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

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
            <BlogForm />
          </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
