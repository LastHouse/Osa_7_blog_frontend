import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const addLike = (id) => {
    const blogToLike = blogs.find((a) => a.id === id);
    dispatch(likeBlog(blogToLike));
    dispatch(setNotification(`${user.name} added a new like`, 5));
  };

  const delBlog = (id, title) => {
    if (
      window.confirm(`Do you really want to delete ${title} from the list?`)
    ) {
      dispatch(deleteBlog(id));
      dispatch(setNotification(`the blog ${title} was deleted from server`, 5));
    }
  };

  console.log(blog);
  if (!blog) {
    return <div>Nothing to show</div>;
  }

  return (
    <div>
      {user === null ? (
        <div className="blogStyle">
          {blog.title} by {blog.author}
          <div>
            url: {blog.url}
            <br></br>
            likes: {blog.likes}
            <br></br>
            added by: {blog.user.name}
            <br></br>
          </div>
        </div>
      ) : (
        <div className="blogStyle">
          {blog.title} by {blog.author}
          <div>
            url: {blog.url}
            <br></br>
            likes: {blog.likes}{' '}
            <button id="like-button" onClick={() => addLike(blog.id)}>
              like
            </button>
            <br></br>
            added by: {blog.user.name}
            <br></br>
            {user.name !== blog.user.name ? (
              ''
            ) : (
              <div>
                <br></br>
                <button
                  id="remove-button"
                  onClick={() => delBlog(blog.id, blog.title)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
