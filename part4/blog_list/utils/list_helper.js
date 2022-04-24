const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return -1;
  let index = 0;
  for (items in blogs) {
    const likes = blogs[items].likes;
    if (likes > blogs[index].likes) {
      index = items;
    }
  }
  return blogs[index];
};

const mostBlogs = (blogs) => {
  let authors = {};
  for (blog of blogs) {
    const author = blog.author;
    if (authors[author]) {
      authors[author] += 1;
    } else {
      authors[author] = 1;
    }
  }

  let max = 0;
  let topAuthor = "";
  for (author in authors) {
    if (authors[author] > max) {
      max = authors[author];
      topAuthor = author;
    }
  }
  console.log(topAuthor);
  return topAuthor;
};

const mostLikes = (blogs) => {
  let authors = {};
  for (blog of blogs) {
    const author = blog.author;
    if (authors[author]) {
      authors[author] += blog.likes;
    } else {
      authors[author] = blog.likes;
    }
  }

  let max = 0;
  let topAuthor = "";
  for (author in authors) {
    if (authors[author] > max) {
      max = authors[author];
      topAuthor = author;
    }
  }
  console.log(topAuthor);
  return {
    author: topAuthor,
    likes: max,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
