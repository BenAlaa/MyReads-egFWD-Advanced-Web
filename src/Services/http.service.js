import axios from "axios";
import { toast } from "react-toastify";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

// Add Default Api configuration
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.Authorization = token;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("Unexpected error happend");
  } else {
    toast.error(error?.response?.data);
  }
  return Promise.reject(error);
});


const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};
export default methods;