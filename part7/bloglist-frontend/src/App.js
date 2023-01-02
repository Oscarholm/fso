import { useState, useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { login, logout, setUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      dispatch(setUser(loggedUserJSON));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      login({
        username,
        password,
      })
    );
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logout());
    setUsername("");
    setPassword("");
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
