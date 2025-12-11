import type { JSX } from "react";

interface IProtectedRoute {
  children: JSX.Element;
  path: string;
}

const ProtectedRoute = ({ children, path}: IProtectedRoute) => {
    return children;
}

export default ProtectedRoute;