// client/src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // important for cookies with JWT
});

export default instance;
