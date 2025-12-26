import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/useAuthStore";

interface IProtectedRoute {
  children: JSX.Element;
  path: string;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;