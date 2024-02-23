import { create } from 'zustand';

interface AuthStoreState {
  isLoggedIn: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};
const setToken = (token: string) => {
  localStorage.setItem('token', token);
};
const removeToken = () => {
  localStorage.removeItem('token');
};

const useAuthStore = create<AuthStoreState>((set) => ({
  isLoggedIn: getToken() ? true : false,
  storeLogin: (token: string) => {
    set(() => ({ isLoggedIn: true }));
    setToken(token);
  },
  storeLogout: () => {
    set(() => ({ isLoggedIn: false }));
    removeToken();
  },
}));

export default useAuthStore;
