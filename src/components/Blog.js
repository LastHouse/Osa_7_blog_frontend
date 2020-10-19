import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog, user, addLike, delBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blog && blog.user.name === undefined) {
    console.log(blog);
    return <div>Fetching data...</div>;
  }

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
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default Blog;
