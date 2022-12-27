describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Oscar Holm",
      username: "oscar",
      password: "holm",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("oscar");
      cy.get("#password").type("holm");
      cy.get("#login-button").click();

      cy.contains("oscar successfully logged in");
      cy.get(".success").should("have.css", "color", "rgb(0, 128, 0)");
    });
    it("fails with incorrect credentials", function () {
      cy.get("#username").type("oscar");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error").should("contain", "wrong credentials");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "oscar", password: "holm" });
    });
    it("a new blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("blog with most likes");
      cy.get("#author").type("cypress");
      cy.get("#url").type("www.testurl.com");
      cy.get("#submit-button").click();

      cy.get(".success").should("contain", "blog with most likes");
      cy.contains("blog with most likes cypress").contains("view").click();
      cy.contains("likes 0");
      cy.get("#like-button").click();
      cy.contains("likes 1");
    });

    it("posts can be deleted", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("blog with most likes");
      cy.get("#author").type("cypress");
      cy.get("#url").type("www.testurl.com");
      cy.get("#submit-button").click();

      cy.contains("blog with most likes cypress").contains("view").click();
      cy.contains("remove").click();
      cy.get(".success").should(
        "contain",
        "blog with most likes by cypress deleted"
      );
    });

    it("blogs are in descending order by likes", function () {
      const likes = [0, 3, 5];
      likes.map((quantity) =>
        cy.newBlog({
          title: `blog containing ${quantity} likes`,
          likes: quantity,
        })
      );
      cy.visit("http://localhost:3000");
      cy.contains("blog containing 3 likes");
      cy.get(".blog").eq(0).should("contain", "blog containing 5 likes");
      cy.get(".blog").eq(1).should("contain", "blog containing 3 likes");
      cy.get(".blog").eq(2).should("contain", "blog containing 0 likes");
    });
  });
});
