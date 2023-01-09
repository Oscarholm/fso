import { useRef } from "react";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import LoginForm from "../components/LoginForm";
import Togglable from "../components/Togglable";

const Home = () => {
  const user = useSelector((state) => state.user);

  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h1>Blogs</h1>
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

export default Home;
