import {
  QueryClientProvider,
  QueryClient,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import routerMeta from "./interfaces/routerMeta";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/fallbacks/ErrorFallback";
import Navbar from "./components/Navigation/Navbar";
import "./App.css";
import LoadingFallback from "./components/fallbacks/LoadingFallback";

const pages = import.meta.glob("./pages/**/*.tsx");

const lazyImport = (file: string) =>
  lazy(pages[`./pages/${file}.tsx`] as () => Promise<any>);

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
          const filePath = meta.file ?? meta.name;
          const Component = lazyImport(filePath!);

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
            const filePath = meta.file ?? meta.name;
            const Component = lazyImport(filePath!);

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
