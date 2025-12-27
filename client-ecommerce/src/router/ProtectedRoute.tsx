import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/useAuthStore";

interface IProtectedRoute {
  children: JSX.Element;
  path: string;
  isAdmin?: boolean;
}

const ProtectedRoute = ({ children, isAdmin }: IProtectedRoute) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAdmin && user?.role !== "ADMIN") {
    return <Navigate to="/*" state={{ from: location }} replace />;
  }

  // Si está autenticado, mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;