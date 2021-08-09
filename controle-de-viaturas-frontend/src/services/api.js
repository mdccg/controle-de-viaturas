import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.106:3001/api/v1'
});

export default api;