import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  let createBlog;
  let user;

  beforeEach(() => {
    createBlog = jest.fn();
    user = userEvent.setup();
    render(<BlogForm addBlog={createBlog} />).container;
  });

  test("check that event handler received is called with the right details", async () => {
    // have to give input to the form
    const titleInput = screen.getByPlaceholderText("Harry Potter");
    const authorInput = screen.getByPlaceholderText("JK Rowlings");
    const urlInput = screen.getByPlaceholderText("www.harrypotter.co.uk");
    const button = screen.getByText("create");

    await user.type(titleInput, "testing form");
    await user.type(authorInput, "random author");
    await user.type(urlInput, "website.com");
    await user.click(button);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("testing form");
    expect(createBlog.mock.calls[0][0].author).toBe("random author");
    expect(createBlog.mock.calls[0][0].url).toBe("website.com");
  });
});
