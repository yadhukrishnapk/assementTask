import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  
  setAuth: (token, user) => set({
    token,
    user,
    isAuthenticated: true
  }),
  
  clearAuth: () => set({
    token: null,
    user: null,
    isAuthenticated: false
  })
}));

export default useAuthStore;