// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuth(token, JSON.parse(user));
      
      if (location.pathname === '/login') {
        navigate('/', { replace: true });
      }
    } else if (!token && location.pathname !== '/login') {
      clearAuth();
      navigate('/login', { replace: true });
    }
  }, [setAuth, clearAuth, navigate, location.pathname]);

  return { isAuthenticated };
};
