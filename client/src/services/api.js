import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-backend-zxl8.onrender.com/api"
});

export default api;