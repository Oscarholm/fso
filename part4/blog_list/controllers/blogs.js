const blogRouter = require("express").Router();
const res = require("express/lib/response");
const Blog = require("../models/blog");
const User = require("../models/user");
const { info } = require("../utils/logger");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    response.json(blog);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post("/", userExtractor, async (request, response, next) => {
  const body = request.body;
  const user = request.user;
  info("the controller is getting the user:", user);

  if (!body.title || !body.url) {
    response.status(400).send("Bad request");
  } else if (!user) {
    response.status(401).send("invalid token");
  } else {
    const blog = new Blog({
      title: body.title,
      author: user.name,
      likes: body.likes || 0,
      url: body.url,
      user: user._id,
    });
    try {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    } catch (exception) {
      next(exception);
    }
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
  };
  try {
    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
