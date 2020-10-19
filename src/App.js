import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BlogList from './components/BlogList';
import AddBlog from './components/AddBlog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Footer from './components/Footer';
import { initializeBlogs } from './reducers/blogReducer';
import { getCurrentUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <LoginForm />
      <br></br>
      <AddBlog />
      <BlogList />
      <Footer />
    </div>
  );
};

export default App;
