import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  let container;

  const blog = {
    title: "Test book",
    author: "JK Tester",
    url: "jktester.co",
    user: "Oscar",
  };

  const user = {
    id: 1,
    username: "Oscar",
  };
  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container;
  });

  test("renders title and author but not url or likes", () => {
    // header section is showing and contains title and author but not url or likes
    const blogHeader = container.querySelector(".blogHeader");
    expect(blogHeader).toHaveStyle("display: block");
    expect(blogHeader).toHaveTextContent("Test book");
    expect(blogHeader).toHaveTextContent("JK Tester");
    expect(blogHeader).not.toHaveTextContent("jktester.co");
    expect(blogHeader).not.toHaveTextContent("likes");

    // detailed section is not showing
    const blogDetails = container.querySelector(".blogDetails");
    expect(blogDetails).toHaveStyle("display: none");
  });

  test("renders url and likes after pressing button", async () => {
    const event = userEvent.setup();
    const button = screen.getByText("view");
    await event.click(button);

    const div = container.querySelector(".blogDetails");
    expect(div).not.toHaveStyle("display: none");
  });

  test("if button is clicked twice, handler is called twice", async () => {
    const mockHandler = jest.fn();
    const toggleDisplay = userEvent.setup();
    const button = screen.getByText("view");

    await toggleDisplay.click(button);
    await toggleDisplay.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
