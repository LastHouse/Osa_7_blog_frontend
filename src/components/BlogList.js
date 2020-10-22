import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });

  if (sortedBlogs.length === 0) {
    return (
      <div>
        <p>No blogs added. Please add content.</p>
      </div>
    );
  }

  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <div className="blogStyle" key={blog.id}>
          <Link to={`/posts/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </ul>
  );
};

export default BlogList;
