import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import User from './components/User';
import LoginForm from './components/LoginForm';
import AddBlog from './components/AddBlog';
import BlogList from './components/BlogList';
import Footer from './components/Footer';
import { initializeBlogs } from './reducers/blogReducer';
import { getCurrentUser } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getCurrentUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <h2>Blogs</h2>
      <Notification />
      <LoginForm />
      <Switch>
        <Route path="/users">
          <User />
        </Route>
        <Route path="/">
          <AddBlog />
          <BlogList />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
