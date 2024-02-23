import { httpClient } from './http';
import { SignUpProps } from 'pages/SignUp';

export const signUp = async (userData: SignUpProps) => {
  const response = await httpClient.post('/users/join', userData);
  return response.data;
};

export const resetRequest = async (data: SignUpProps) => {
  const response = await httpClient.post('/users/reset', data);
  return response.data;
};

export const resetPassword = async (data: SignUpProps) => {
  const response = await httpClient.put('/users/reset', data);
  return response.data;
};
