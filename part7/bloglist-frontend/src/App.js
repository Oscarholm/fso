import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "./reducers/userReducer";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import Blogs from "./views/Blogs";
import { initializeBlogs } from "./reducers/blogReducer";
import Blog from "./views/Blog";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    dispatch(initializeBlogs());

    if (loggedUserJSON) {
      dispatch(setUser(loggedUserJSON));
    }
  }, [dispatch]);

  const padding = {
    padding: 5,
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Notification message={notification} />
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/blogs">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {user ? (
          <div>
            <em>{user.username} logged in</em>
            <br />
            <button onClick={handleLogout}>logout</button>
          </div>
        ) : (
          <Link style={padding} to="/login">
            Login
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users/:id" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};
export default App;
