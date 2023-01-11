import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import LoginForm from "../components/LoginForm";
import Togglable from "../components/Togglable";
import { like } from "../reducers/blogReducer";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell>by {blog.author}</TableCell>
                    <TableCell>{blog.likes} likes</TableCell>
                    <TableCell>
                      <Button
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(like(blog.id, blog));
                        }}
                      >
                        Like
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Home;
