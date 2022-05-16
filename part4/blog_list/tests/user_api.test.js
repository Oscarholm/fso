const bcrypt = require("bcrypt");
const User = require("../models/user");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("hemlig", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();
    console.log("usersAtStart", usersAtStart);

    const newUser = {
      username: "oscarholm",
      name: "Oscar Holm",
      password: "hockey",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    console.log("usersAtEnd: ", usersAtEnd);

    const usernames = usersAtEnd.map((u) => u.username);
    console.log("usernames: ", usernames);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "hero",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if username or password invalid", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Ozzy",
      name: "Oscar",
      password: "oh",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username and password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails if no password is given", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Ozzy",
      name: "Oscar",
      password: "",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("please provide username and password");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
