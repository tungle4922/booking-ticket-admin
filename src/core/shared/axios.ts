import axios, { AxiosInstance } from 'axios';

const cancelTokenSource = axios.CancelToken.source();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
  cancelToken: cancelTokenSource.token,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['Token-Is-Present'] = 1;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export { axiosInstance, cancelTokenSource };
