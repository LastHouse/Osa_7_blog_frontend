import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { logInUser, logOutUser } from '../reducers/loginReducer';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    e.target.username.value = '';
    const password = e.target.password.value;
    e.target.password.value = '';

    try {
      dispatch(
        logInUser({
          username: username,
          password: password,
        })
      );
    } catch (exception) {
      dispatch(setNotification('wrong username or password!', 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(logOutUser());
  };

  return (
    <div>
      {user === null ? (
        <div className="navBar">
          <Link className="link" to="/">
            Blogs
          </Link>{' '}
          <Link className="link" to="/users">
            Users
          </Link>{' '}
          <form class="form-inline" onSubmit={handleLogin}>
            <div>Username: </div>
            <input className="link" name="username" />
            <div>Password: </div>
            <input className="link" type="password" name="password" />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="navBar">
          <Link className="link" to="/">
            Blogs
          </Link>
          <Link className="link" to="/users">
            Users
          </Link>
          <p className="link">logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
