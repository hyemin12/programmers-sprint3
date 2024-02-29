import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from 'utils/savedTokenToLocalStorage';

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

// 공통 요청 함수
type RequestMethod = 'get' | 'post' | 'put' | 'delete';

const httpMethods: Record<RequestMethod, (endPoint: string, payload?: any) => Promise<any>> = {
  post: (endPoint, payload) => httpClient.post(endPoint, payload),
  get: (endPoint, payload) => httpClient.get(endPoint, payload),
  put: (endPoint, payload) => httpClient.put(endPoint, payload),
  delete: (endPoint) => httpClient.delete(endPoint),
};

export const requestHandler = async <T>(method: RequestMethod, endPoint: string, payload?: T) => {
  const response = await httpMethods[method](endPoint, payload);

  if (endPoint === '/books' && method === 'get') return response.data;
  return response.data?.lists || response.data;
};
