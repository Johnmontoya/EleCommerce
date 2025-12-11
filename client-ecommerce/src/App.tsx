import {
  QueryClientProvider,
  QueryClient,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { Suspense } from "react";
import routerMeta from "./router/routerMeta";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./shared/ui/ErrorFallback";
import Navbar from "./shared/ui/Navbar";
import "./App.css";
import LoadingFallback from "./shared/ui/LoadingFallback";
import { lazyImport } from "./router/lazyImports";

const authRoutes = [routerMeta.LoginPage, routerMeta.RegisterPage];

const layoutRoutes = Object.keys(routerMeta)
  .map((key) => routerMeta[key])
  .filter((route) => !authRoutes.includes(route));

function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <Routes>
        {authRoutes.map((meta) => {
          const Component = lazyImport(meta.feature!, meta.page!);

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

        {/* Rutas con Layour */}
        <Route element={<Navbar />}>
          {layoutRoutes.map((meta) => {
            const Component = lazyImport(meta.feature!, meta.page!)

            return (
              <Route
                key={meta.path}
                path={meta.path}
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <ErrorFallback
                          resetErrorBoundary={resetErrorBoundary}
                        />
                      )}
                    >
                      <Component />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
