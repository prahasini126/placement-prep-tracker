import axios from "axios";

// ✅ Use environment variable in production
// ✅ Use localhost in development

const baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const instance = axios.create({
  baseURL,
});

// ✅ Attach token automatically
instance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
