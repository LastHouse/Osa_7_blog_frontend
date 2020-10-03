import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import AddBlog from './components/AddBlog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Footer from './components/Footer';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const initialState = '';
  const [blogs, setBlogs] = useState([]);
  //const [errorMessage, setErrorMessage] = useState(null);
  //const [message, setMessage] = useState(null);
  const [username, setUsername] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [user, setUser] = useState(null);
  const addBlogRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

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
    blogService.getAll().then((blogs) => setBlogs(blogs));
    console.log(user);
  };

  const addBlog = (newObject) => {
    addBlogRef.current.toggleVisibility();
    blogService
      .create(newObject)
      .then((response) => {
        setBlogs([...blogs, response]);
        dispatch(setNotification(`${user.name} added a new blog`, 5));
      })
      .catch((error) => {
        console.log(error.response.data.error);
        dispatch(setNotification(error.response.data.error, 5));
      });
  };

  const likeBlog = (id, newObject) => {
    blogService
      .like(id, newObject)
      .then((response) => {
        setBlogs(blogs.map((item) => (item.id !== id ? item : response)));

        dispatch(setNotification(`${user.name} added a new like`, 5));
      })
      .catch((error) => {
        console.log(error.response.data.error);
        dispatch(setNotification(error.response.data.error, 5));
      });
  };

  const delBlog = (id, title) => {
    if (
      window.confirm(`Do you really want to delete ${title} from the list?`)
    ) {
      blogService
        .deleteBlog(id)
        .then(() => {
          dispatch(
            setNotification(`the blog ${title} was deleted from server`, 5)
          );

          setBlogs(blogs.filter((n) => n.id !== id));
        })
        .catch((error) => {
          console.log(error.response.data.error);
          dispatch(setNotification(error.response.data.error, 5));

          setBlogs(blogs.filter((n) => n.id !== id));
        });
    }
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
        <AddBlog createBlog={addBlog} user={user} />
      </Togglable>
    </div>
  );

  const sortedBlogs = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });

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
      <ul>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            delBlog={delBlog}
            user={user}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
