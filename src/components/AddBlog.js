import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { initializeBlogs } from '../reducers/blogReducer';
import Togglable from './Togglable';

const AddBlog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  const addBlog = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    e.target.title.value = '';
    const author = e.target.author.value;
    e.target.author.value = '';
    const url = e.target.url.value;
    e.target.url.value = '';

    const newObject = {
      title: title,
      author: author,
      url: url,
    };

    dispatch(createBlog(newObject));
    dispatch(setNotification(`${user.name} added a new blog`, 5));
  };

  return (
    <div>
      <Togglable buttonLabel="new blog">
        {' '}
        <form onSubmit={addBlog}>
          <h2>Add new</h2>
          <div>
            title: <input name="title" />
          </div>
          <div>
            author: <input name="author" />
          </div>
          <div>
            url: <input name="url" />
          </div>{' '}
          <div>
            <br></br>
            <button type="submit">add</button>
          </div>
        </form>
      </Togglable>
    </div>
  );
};

export default AddBlog;
