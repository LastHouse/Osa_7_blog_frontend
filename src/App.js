import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import User from './components/User';
import Blog from './components/Blog';
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
      <NavBar />
      <h2>Blogs</h2>
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
