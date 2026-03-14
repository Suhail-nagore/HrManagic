import axios from "axios";
import NProgress from "nprogress";

const API = axios.create({
  baseURL: "https://hrmanagic-backend.onrender.com/api"
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