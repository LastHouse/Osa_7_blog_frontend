import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { logInUser, logOutUser } from '../reducers/loginReducer';
import Togglable from './Togglable';

const LoginForm = () => {
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
        <Togglable buttonLabel="login">
          <h2>Log in to application</h2>

          <form onSubmit={handleLogin}>
            <div>
              username: <input name="username" />
            </div>
            <div>
              password: <input type="password" name="password" />
            </div>
            <br></br>
            <button id="login-button" type="submit">
              login
            </button>
          </form>
        </Togglable>
      ) : (
        <div>
          <p>logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
