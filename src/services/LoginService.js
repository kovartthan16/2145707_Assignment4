import axios from 'axios';

const API_URL = 'http://localhost:9090/api/v1';

export default {
  login(email, password) {
    return axios.post(`${API_URL}/users/login`, { email, password });
  },
};
