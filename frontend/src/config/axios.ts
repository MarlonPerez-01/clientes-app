import axios from 'axios';

export const clienteAxios = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
});
