import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const likeBlog = async (objectId, newObject) => {
  const response = await axios.put(`${baseUrl}/${objectId}`, newObject);
  return response.data;
};

const deleteBlog = async (objectId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${objectId}`, config);
  return response.data;
};

const comment = async (objectId, comment) => {
  const response = await axios.post(`${baseUrl}/${objectId}/comments`, comment);
  return response.data;
};

const exportObject = {
  getAll,
  create,
  setToken,
  likeBlog,
  deleteBlog,
  comment,
};
export default exportObject;
