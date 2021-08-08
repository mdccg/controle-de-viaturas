import axios from 'axios';

const api = axios.create({
  baseURL: 'https://controle-de-viaturas-mock-api.herokuapp.com/api/v1'
});

export default api;