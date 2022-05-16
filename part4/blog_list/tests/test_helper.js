const Blog = require("../models/blog");
const User = require("../models/user");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const initialBlogs = [
  {
    title: "Test blog post numbero uno",
    likes: 5,
    url: "www.url.se",
  },
  {
    title: "Blog post number two for testing",
    likes: 2,
    url: "www.url.se",
  },
];

const initialUser = {
  username: "user",
  password: "password",
};

module.exports = {
  blogsInDb,
  usersInDb,
  initialBlogs,
  initialUser,
};
