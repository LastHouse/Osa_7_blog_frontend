import React from 'react';
import Blog from './Blog';
import { useSelector } from 'react-redux';

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });

  if (!sortedBlogs) {
    return null;
  }

  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </ul>
  );
};

export default BlogList;
