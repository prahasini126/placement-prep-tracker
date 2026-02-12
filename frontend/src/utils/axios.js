import axios from "axios";

const instance = axios.create({
  baseURL: "hhttps://placement-prep-backend-umu6.onrender.com/"
});

instance.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
