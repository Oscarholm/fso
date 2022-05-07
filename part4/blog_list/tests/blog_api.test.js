const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Test blog post numbero uno",
    author: "tester person",
    likes: 5,
    url: "www.url.se",
  },
  {
    title: "Blog post number two for testing",
    author: "another tester",
    likes: 2,
    url: "www.url.se",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("correct amount of notes returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(2);
});

test("identifier property of blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const testEntry = {
    title: "can this be added",
    author: "Testington",
    likes: 14,
    url: "www.url.se",
  };

  await api
    .post("/api/blogs")
    .send(testEntry)
    .expect("Content-Type", /application\/json/)
    .expect(201);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((r) => r.title);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain("can this be added");
}, 10000);

test("likes property defaults to 0 when undefined", async () => {
  const newBlog = {
    title: "Blog without like",
    author: "Author who no one likes",
    url: "www.url.se",
  };

  await api.post("/api/blogs").send(newBlog).expect(201);
  const response = await api.get("/api/blogs");
  response.body.map((r) => {
    if (r.title === newBlog.title) {
      expect(r.likes).toEqual(0);
    }
  });
}, 10000);

test("400 bad request of title or url missing", async () => {
  const newBlog2 = {
    author: "Author with no title",
    likes: 4,
  };

  await api.post("/api/blogs").send(newBlog2).expect(400).expect("Bad request");
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await Blog.find({});
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await Blog.find({});

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe("updating a blog", () => {
  test("succeeds with valid data", async () => {
    const blogs = await Blog.find({});
    const blogToUpdate = blogs[0];
    const likes = blogToUpdate.likes;
    blogToUpdate.likes++;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        likes: blogToUpdate.likes,
      })
      .expect(200);
    const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`);
    expect(updatedBlog.body.likes).toEqual(likes + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
