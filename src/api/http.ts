import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from 'store/auth.store';

const BASE_URL = 'http://localhost:8888';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken() ? getToken() : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);

      // 로그인 만료 처리
      if (error.response.statusText === 'Unauthorized') {
        removeToken();
        window.location.href = '/login';
        return;
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
