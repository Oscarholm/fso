import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import userServices from "../services/users";

const Blogs = () => {
  const [user, setUser] = useState(null);
  const userId = useParams().id;
  let blogs = useSelector((state) => state.blogs);
  if (userId) blogs = blogs.filter((blog) => blog.user.id === userId);

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        try {
          const user = await userServices.getUser(userId);
          setUser(user);
        } catch (err) {
          return;
        }
      };
      getUser();
    }
  }, []);

  return (
    <div>
      {user === null ? <h1>All blogs</h1> : <h1>{user.username}</h1>}
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>by {blog.author}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Blogs;
