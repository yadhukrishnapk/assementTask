// src/components/auth/PrivateRoute.js
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return element;
};

export default PrivateRoute;
