import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error.response.data.errors);
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error.response.data.errors);
  }
);

export default apiService;
