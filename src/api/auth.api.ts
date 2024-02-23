import { httpClient } from './http';
import { SignUpProps } from 'pages/SignUp';

export const SignUp = async (userData: SignUpProps) => {
  const response = await httpClient.post('/users/join', userData);
  return response.data;
};
