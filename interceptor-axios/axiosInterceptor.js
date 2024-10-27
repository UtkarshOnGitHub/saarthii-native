import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

let url = 'https://api.saarthii.tech/api';

const apiClient = axios.create({
  baseURL: url,
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
