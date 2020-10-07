import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import loginService from './services/login';
import AddBlog from './components/AddBlog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Footer from './components/Footer';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const initialState = '';

  const [username, setUsername] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [user, setUser] = useState(null);
  const addBlogRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername(initialState);
      setPassword(initialState);
    } catch (exception) {
      dispatch(setNotification('wrong username or password!', 5));
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername(initialState);
    setPassword(initialState);
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(initializeBlogs());
  };

  const loginForm = () => (
    <div>
      <Togglable buttonLabel="login">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </Togglable>
    </div>
  );

  const blogForm = () => (
    <div>
      <br></br>
      <Togglable buttonLabel="new blog" ref={addBlogRef}>
        <br></br>
        <AddBlog user={user} />
      </Togglable>
    </div>
  );

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          <br></br>
          {blogForm()}
        </div>
      )}
      <BlogList user={user} />
      <Footer />
    </div>
  );
};

export default App;
