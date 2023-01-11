import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { addComment, like } from "../reducers/blogReducer";

const Blog = () => {
  const [comment, setComment] = useState("");
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

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog, comment));
    setComment("");
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
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
          placeholder="write a comment"
          id="comment"
        />
        <button type="submit" id="submit-button">
          add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment.id}>{comment.comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default Blog;
