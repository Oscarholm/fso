const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { info } = require("../utils/logger");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    date: new Date(),
  });

  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
