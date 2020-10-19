import React from 'react';
import Blog from './Blog';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const addLike = (id) => {
    const blogToLike = blogs.find((a) => a.id === id);
    dispatch(likeBlog(blogToLike, blogs));
    dispatch(setNotification(`${user.name} added a new like`, 5));
  };

  const delBlog = (id, blogs, title) => {
    if (
      window.confirm(`Do you really want to delete ${title} from the list?`)
    ) {
      dispatch(deleteBlog(id, blogs));
      dispatch(setNotification(`the blog ${title} was deleted from server`, 5));
    }
  };

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
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          addLike={addLike}
          delBlog={delBlog}
        />
      ))}
    </ul>
  );
};

export default BlogList;
