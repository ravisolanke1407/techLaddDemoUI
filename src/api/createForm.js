import axios from "axios";
export const createFormAPI = async (reqbody) => {
  return axios.post("http://localhost:5000/create", reqbody);
};
