import { AuthData } from 'models/user.model';
import { httpClient } from './http';

export const signUp = async (userData: AuthData) => {
  const response = await httpClient.post('/users/join', userData);
  return response.data;
};

export const resetRequest = async (data: AuthData) => {
  const response = await httpClient.post('/users/reset', data);
  return response.data;
};

export const resetPassword = async (data: AuthData) => {
  const response = await httpClient.put('/users/reset', data);
  return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (userData: AuthData) => {
  const response = await httpClient.post<LoginResponse>('/users/login', userData);
  return response.data;
};
