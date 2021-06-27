import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.8:3001/api/v1'
});

export default api;