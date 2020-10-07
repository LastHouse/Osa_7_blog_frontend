import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const AddBlog = ({ user }) => {
  const dispatch = useDispatch();

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

    console.log(newObject);

    dispatch(createBlog(newObject));
    dispatch(setNotification(`${user.name} added a new blog`, 5));
  };

  return (
    <div>
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
    </div>
  );
};
export default AddBlog;
