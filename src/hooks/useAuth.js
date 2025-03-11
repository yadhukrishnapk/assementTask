// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom, isAuthenticatedAtom } from '../store/authStore';

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
      
      if (location.pathname === '/login') {
        navigate('/', { replace: true });
      }
    } else if (!token && location.pathname !== '/login') {
      setAuth({});
      navigate('/login', { replace: true });
    }
  }, [setAuth, navigate, location.pathname]);

  return { isAuthenticated };
};