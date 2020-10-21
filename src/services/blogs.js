import axios from 'axios';
const baseUrl = '/api/posts';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const object = {
    title: newObject.title,
    author: newObject.author,
    url: newObject.url,
  };
  const response = await axios.post(baseUrl, object, config);
  return response.data;
};

const like = async (object) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${object.id}`, object, config);
  return response.data;
};

const del = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  console.log(response.data);
  return response.data;
};

export default { getAll, getOne, create, like, setToken, del };
