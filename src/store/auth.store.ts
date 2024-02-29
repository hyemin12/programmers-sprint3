import { getToken } from 'utils/savedTokenToLocalStorage';
import { create } from 'zustand';

interface AuthStoreState {
  isLoggedIn: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  isLoggedIn: getToken() ? true : false,
  storeLogin: (token: string) => {
    if (token) {
      set(() => ({ isLoggedIn: true }));
    }
  },
  storeLogout: () => {
    set(() => ({ isLoggedIn: false }));
  },
}));

export default useAuthStore;
