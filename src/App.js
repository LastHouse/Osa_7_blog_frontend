import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Notification from './components/Notification';
import Home from './components/Home';
import User from './components/User';
import Blog from './components/Blog';
import UserList from './components/UserList';
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
  const blogs = useSelector((state) => state.blogs);

  const userMatch = useRouteMatch('/users/:id');
  const user = userMatch
    ? users.find((user) => user.id === String(userMatch.params.id))
    : null;

  const blogMatch = useRouteMatch('/posts/:id');
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === String(blogMatch.params.id))
    : null;

  return (
    <div>
      <Header />
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/posts/:id">
          <Blog blog={blog} />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/posts">
          <BlogList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route render={() => <h1>404 Page not found</h1>} />
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
