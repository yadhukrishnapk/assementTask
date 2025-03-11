// src/components/auth/PrivateRoute.js
import { Navigate, useLocation } from "react-router-dom";
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from "../../store/authStore";

const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return element;
};

export default PrivateRoute;