import { useNavigate } from "react-router-dom";

interface IErrorFallbackProps {
  resetErrorBoundary: (...args: unknown[]) => void;
}

const ErrorFallback = ({ resetErrorBoundary }: IErrorFallbackProps) => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Hubo un problema en la solicitud!</h2>
      <div>
        <button type="button" onClick={() => resetErrorBoundary()}>
          Intentar de nuevo
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/", { replace: true });
            window.location.reload();
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;