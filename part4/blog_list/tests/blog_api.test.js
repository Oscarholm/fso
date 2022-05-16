const mongoose = require("mongoose");
const supertest = require("supertest");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const { info } = require("../utils/logger");
const { blogsInDb } = require("./test_helper");

const Blog = require("../models/blog");
const User = require("../models/user");

beforeAll(async () => {
  await User.deleteMany({});
  await api.post("/api/users").send(helper.initialUser);
});

describe("retrieving blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
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
});

describe("Creating blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });
  test("a valid blog can be added", async () => {
    const auth = await api
      .post("/api/login")
      .send(helper.initialUser)
      .set("Accept", "application/json");
    token = auth.body.token;

    const testEntry = {
      title: "can this be added",
      likes: 14,
      url: "www.url.se",
    };

    await api
      .post("/api/blogs")
      .send(testEntry)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /application\/json/)
      .expect(201);

    const response = await helper.blogsInDb();
    const titles = response.map((r) => r.title);
    expect(response).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("can this be added");
  }, 10000);

  test("likes property defaults to 0 when undefined", async () => {
    const auth = await api
      .post("/api/login")
      .send(helper.initialUser)
      .set("Accept", "application/json");
    token = auth.body.token;

    const newBlog = {
      title: "Blog without like",
      author: "Author who no one likes",
      url: "www.url.se",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /application\/json/)
      .expect(201);
    const response = await api.get("/api/blogs");
    response.body.map((r) => {
      if (r.title === newBlog.title) {
        expect(r.likes).toEqual(0);
      }
    });
  }, 10000);

  test("400 bad request of title or url missing", async () => {
    const auth = await api
      .post("/api/login")
      .send(helper.initialUser)
      .set("Accept", "application/json");
    token = auth.body.token;

    const newBlog2 = {
      author: "Author with no title",
      likes: 4,
    };

    await api
      .post("/api/blogs")
      .send(newBlog2)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .expect(400)
      .expect("Bad request");
  });

  test("adding blog without token results in 401 unauthorized", async () => {
    const unauthorizedBlog = {
      title: "This blog is posted without token",
      url: "www.tokenless.io",
    };
    await api
      .post("/api/blogs")
      .send(unauthorizedBlog)
      .set("Accept", "application/json")
      .expect(401);
  });
});

describe("deletion of blogs", () => {
  beforeEach(async () => {
    const auth = await api
      .post("/api/login")
      .send(helper.initialUser)
      .set("Accept", "application/json");
    token = auth.body.token;
    await Blog.deleteMany({});
    await api
      .post("/api/blogs")
      .send({
        title: "blog to be deleted",
        url: "www.delete.no",
      })
      .set("Authorization", `Bearer ${token}`);
  });
  test("can blog be deleted with right token", async () => {
    const blogToDelete = await blogsInDb();
    await api
      .delete(`/api/blogs/${blogToDelete[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    const blogs = await Blog.find({});
    info(blogs);
    expect(blogs.length).toEqual(0);
  });

  test("delete without token gives 401 Unauthorized", async () => {
    const blogToDelete = await blogsInDb();
    await api.delete(`/api/blogs/${blogToDelete[0].id}`).expect(401);
  });
});

describe("updating a blog", () => {
  beforeEach(async () => {
    const auth = await api
      .post("/api/login")
      .send(helper.initialUser)
      .set("Accept", "application/json");
    token = auth.body.token;
    await Blog.deleteMany({});
    await api
      .post("/api/blogs")
      .send({
        title: "blog to be updated",
        url: "www.delete.no",
        likes: 5,
      })
      .set("Authorization", `Bearer ${token}`);
  });

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
