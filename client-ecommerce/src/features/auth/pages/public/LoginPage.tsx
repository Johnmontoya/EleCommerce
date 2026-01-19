import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { CiLogin } from "react-icons/ci";
import { useAuthStore } from "../../store/useAuthStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const { login, isAuthenticated, clearError } = useAuthStore();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Limpiar error al desmontar
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    try {
      const response = await login({ email, password });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen background-light dark:background-light">
      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 my-20 backdrop-blur-sm">
            {/* Title */}
            <div className="text-center mb-8">
              <Link to={"/"} className="text-3xl font-bold text-slate-100 mb-2">
                Bienvenido de nuevo a{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-blue-500">ELECOMMERCE</span>
              </Link>
              <p className="text-slate-400 text-sm">Ingresa tus credenciales</p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {/* Email Input */}
              <div>
                <input
                  type="text"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    Recordarme
                  </span>
                </label>
                <Link to={"/forgot-password"}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Sign In Button */}
              <ButtonAction
                onClick={handleSubmit}
                text="Iniciar Sesion"
                variant="primary"
                className="w-full flex items-center justify-center"
              >
                <CiLogin size={18} />
              </ButtonAction>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-800/50 text-slate-400">
                  O continua con
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <ButtonAction
                onClick={() => handleSocialLogin("Google")}
                text={"Google"}
                variant="secondary"
                className="flex justify-center items-center border border-slate-600"
              >
                <FaGoogle size={18} />
              </ButtonAction>
              <ButtonAction
                onClick={() => handleSocialLogin("Facebook")}
                text={"Facebook"}
                variant="secondary"
                className="flex justify-center items-center border border-slate-600"
              >
                <FaFacebook size={18} />
              </ButtonAction>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-slate-400 text-sm mt-6">
              Eres miembro?{" "}
              <Link
                to={"/register"}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Crear una cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
