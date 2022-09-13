import axios from "axios";
const baseUrl = "api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log("login service gets data: ", response.data);
  return response.data;
};

const object = { login };
export default object;
