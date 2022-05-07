const blogRouter = require("express").Router();
const res = require("express/lib/response");
const Blog = require("../models/blog");
const { info } = require("../utils/logger");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
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

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!body.title || !body.url) {
    response.status(400).send("Bad request");
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      likes: body.likes || 0,
      url: body.url,
    });
    try {
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog);
    } catch (exception) {
      next(exception);
    }
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
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
