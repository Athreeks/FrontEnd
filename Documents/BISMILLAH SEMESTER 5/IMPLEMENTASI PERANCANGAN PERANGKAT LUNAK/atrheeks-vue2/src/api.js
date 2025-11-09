// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ubah sesuai URL backend kamu
});

export default api;
