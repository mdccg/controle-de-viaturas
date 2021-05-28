import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://controle-de-viaturas-api.herokuapp.com/api/v1'
  baseURL: 'http://localhost:3001/api/v1',
});

export default api;