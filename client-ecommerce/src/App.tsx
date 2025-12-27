import {
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import routerMeta from "./router/routerMeta";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./shared/ui/ErrorFallback";
import Navbar from "./shared/ui/Navbar";
import LoadingFallback from "./shared/ui/LoadingFallback";
import { lazyImport } from "./router/lazyImports";
import { axiosInterceptor } from "./config/axiosInterceptor";
import { useAuthStore } from "./features/auth/store/useAuthStore";
import { queryClient } from "./shared/lib/queryClient";
import ProtectedRoute from "./router/ProtectedRoute";
import "./App.css";

axiosInterceptor();

const authRoutes = [routerMeta.LoginPage, routerMeta.RegisterPage];

const layoutRoutes = Object.keys(routerMeta)
  .map((key) => routerMeta[key])
  .filter((route) => !authRoutes.includes(route));

function App() {
  const { reset } = useQueryErrorResetBoundary();
  const { getCurrentUser, isAuthenticated, accessToken } = useAuthStore();

  // Obtener usuario actual al iniciar la app si hay token
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      getCurrentUser();
    }
  }, [isAuthenticated, accessToken, getCurrentUser]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {authRoutes.map((meta) => {
            const Component = lazyImport(meta.feature!, meta.site!, meta.page!);

            return (
              <Route
                key={meta.path}
                path={meta.path}
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                      )}
                    >
                      <Component />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
            );
          })}

          {/* Rutas con Layout */}
          <Route element={<Navbar />}>
            {layoutRoutes.map((meta) => {
              const Component = lazyImport(meta.feature!, meta.site!, meta.page!);

              // Si la ruta es privada (site === 'private'), protegerla
              const element = (
                <Suspense fallback={<LoadingFallback />}>
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                      <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                    )}
                  >
                    <Component />
                  </ErrorBoundary>
                </Suspense>
              );

              // Verificar si la ruta requiere autenticación
              const isPrivateRoute = meta.site === 'private';
              const isAdminRoute = meta.isAdmin;

              return (
                <Route
                  key={meta.path}
                  path={meta.path}
                  element={
                    isPrivateRoute ? (
                      <ProtectedRoute path={meta.path} isAdmin={isAdminRoute}>
                        {element}
                      </ProtectedRoute>
                    ) : (
                      element
                    )
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
