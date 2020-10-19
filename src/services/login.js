import axios from 'axios';
import blogService from '../services/blogs';
const baseUrl = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  blogService.setToken(response.data.token);
  window.localStorage.setItem(
    'loggedBlogappUser',
    JSON.stringify(response.data)
  );
  console.log(response.data);
  return response.data;
};

export default { login };
