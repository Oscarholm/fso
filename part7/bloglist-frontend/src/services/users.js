import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const newUser = async (userObject) => {
  const response = await axios.post(baseUrl, userObject);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const exportObject = { getAll, newUser, getUser };
export default exportObject;
