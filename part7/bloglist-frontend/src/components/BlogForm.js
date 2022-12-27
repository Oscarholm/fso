import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = (event) => {
    event.preventDefault();
    addBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Harry Potter"
            id="title"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="JK Rowlings"
            id="author"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="www.harrypotter.co.uk"
            id="url"
          />
        </div>
        <button type="submit" id="submit-button">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
