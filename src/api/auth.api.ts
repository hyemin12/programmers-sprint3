import { IAuthData } from 'models/user.model';
import { requestHandler } from './http';

export const signUp = async (userData: IAuthData) => {
  return await requestHandler('post', '/users/join', userData);
};

export const resetRequest = async (userData: IAuthData) => {
  return await requestHandler('post', '/users/reset', userData);
};

export const resetPassword = async (userData: IAuthData) => {
  return await requestHandler('put', '/users/reset', userData);
};

export const login = async (userData: IAuthData) => {
  return await requestHandler('post', '/users/login', userData);
};
