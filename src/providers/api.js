import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    // 'Authorization': `Bearer ...`,
    'content-type': 'application/json'
  }
});

export default instance;
