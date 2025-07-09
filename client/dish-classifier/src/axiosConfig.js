import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend URL
});

export default apiClient;