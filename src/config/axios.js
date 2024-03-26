import axios from "axios";
import {base_url} from './base_url';
axios.interceptors.request.use(function (config) {
    var token = null

    if(localStorage.getItem("users")) {
      var users = JSON.parse(localStorage.getItem("users"))
      if(users.token) {
        token = users.token
      } else {
        token = localStorage.getItem("token_client") ? localStorage.getItem("token_client") : null
      }
    } else if (localStorage.getItem("token_client")) {
      token = localStorage.getItem("token_client")
    }

    if(token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axios.defaults.baseURL = base_url;

export default axios;
