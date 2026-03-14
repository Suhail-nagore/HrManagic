import axios from "axios";
import NProgress from "nprogress";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((config) => {

  NProgress.start();

  return config;

});

API.interceptors.response.use(

  (response) => {

    NProgress.done();

    return response;

  },

  (error) => {

    NProgress.done();

    return Promise.reject(error);

  }

);

export default API;