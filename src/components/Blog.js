import React from 'react';
import Togglable from './Togglable';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = (blog) => {
    dispatch(likeBlog(blog));
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

  return (
    <div>
      {user === null ? (
        <div style={blogStyle}>
          {blog.title} by {blog.author}
          <Togglable buttonLabel="show more">
            <div>
              url: {blog.url}
              <br></br>
              likes: {blog.likes}
              <br></br>
              added by: {blog.user.name}
              <br></br>
            </div>
          </Togglable>
        </div>
      ) : (
        <div style={blogStyle}>
          {blog.title} by {blog.author}
          <Togglable buttonLabel="show more">
            <div>
              url: {blog.url}
              <br></br>
              likes: {blog.likes}{' '}
              <button id="like-button" onClick={() => addLike(blog)}>
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
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default Blog;
