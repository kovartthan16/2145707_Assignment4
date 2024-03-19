import axios from 'axios';

const API_URL = 'http://localhost:9090/api/v1';

export default {
  registerUser(user) {
    return axios.post(`${API_URL}/users/register`, user);
  }
};
