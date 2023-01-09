import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { like } from "../reducers/blogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const match = useMatch("/blog/:id");
  const blog = match
    ? useSelector((state) =>
        state.blogs.find((blog) => blog.id === match.params.id)
      )
    : null;

  const handleLike = (event) => {
    event.preventDefault();
    dispatch(like(blog.id, blog));
  };

  if (!blog) return null;
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes <button onClick={handleLike}>like</button>
      <br />
      added by {blog.author}
    </div>
  );
};

export default Blog;
