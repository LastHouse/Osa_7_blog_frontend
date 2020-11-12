import loginService from '../services/login';
import blogsService from '../services/blogs';

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data;
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return action.data;
    default:
      return state;
  }
};

export const getCurrentUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON && loggedUserJSON !== 'undefined') {
      const user = JSON.parse(loggedUserJSON);
      blogsService.setToken(user.token);
      dispatch({
        type: 'INIT_USER',
        data: user,
      });
    }
  };
};

export const logInUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    dispatch({
      type: 'LOGIN',
      data: user,
    });
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      data: null,
    });
  };
};

export default loginReducer;
