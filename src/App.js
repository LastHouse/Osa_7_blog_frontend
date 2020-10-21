import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import User from './components/User';
import UserList from './components/UserList';
import AddBlog from './components/AddBlog';
import BlogList from './components/BlogList';
import Footer from './components/Footer';
import { initializeBlogs } from './reducers/blogReducer';
import { getCurrentUser } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getCurrentUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  const match = useRouteMatch('/users/:id');
  const user = match
    ? users.find((user) => user.id === String(match.params.id))
    : null;

  return (
    <div>
      <NavBar />
      <h2>Blogs</h2>
      <Notification />
      <LoginForm />
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <UserList />
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
