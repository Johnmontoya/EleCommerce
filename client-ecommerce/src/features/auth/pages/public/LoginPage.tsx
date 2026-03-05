import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useAuthStore } from "../../store/useAuthStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const { login, isAuthenticated, clearError } = useAuthStore();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

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
    <div className="min-h-screen bg-[#020202] relative font-mono text-white flex items-center justify-center p-4">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Login Form */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#050505] border border-zinc-800 p-8 relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

          {/* Title */}
          <div className="text-center mb-8 border-b border-zinc-900 pb-6">
            <Link to={"/"} className="block text-3xl font-black text-white uppercase tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              ELECOMMERCE <span className="text-[#00f0ff]">//</span>
            </Link>
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase">
              [AUTORIZACION_REQUERIDA_INGRESE_CREDENCIAES]
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[USER_IDENTIFICATION]</label>
              <input
                type="text"
                placeholder="[INGRESE_CORREO]..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#00f0ff] transition-colors text-sm font-bold tracking-widest uppercase"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[SECURITY_KEY]</label>
              <input
                type="password"
                placeholder="[INGRESE_CONTRASEÑA]..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#00f0ff] transition-colors text-sm font-bold tracking-widest uppercase"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-[10px] tracking-widest uppercase font-bold">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="appearance-none w-4 h-4 border border-zinc-600 bg-black checked:bg-[#00f0ff] checked:border-[#00f0ff] transition-colors cursor-pointer relative"
                />
                <span className="text-zinc-500 group-hover:text-white transition-colors">
                  [RECORDAR_DATOS]
                </span>
              </label>
              <Link to={"/forgot-password"}
                className="text-[#ff0055] hover:text-white transition-colors border-b border-[#ff0055]/30 pb-0.5"
              >
                [OLVIDASTE_TU_CONTRASEÑA?]
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-3 bg-[#00f0ff] hover:bg-white text-black font-black py-4 uppercase tracking-[0.2em] transition-colors border-2 border-transparent hover:border-[#00f0ff]"
            >
              <span>[INICIAR_SESION]</span>
              <CiLogin size={20} className="font-black" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-[10px] tracking-widest uppercase font-bold">
              <span className="px-4 bg-[#050505] text-zinc-600">
                [METODOS_AUXILIARES]
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="flex justify-center items-center gap-2 bg-black border border-zinc-800 hover:border-white text-zinc-400 hover:text-white py-3 transition-colors text-xs font-bold uppercase tracking-wider"
            >
              <FaGoogle size={14} />
              <span>Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="flex justify-center items-center gap-2 bg-black border border-zinc-800 hover:border-white text-zinc-400 hover:text-white py-3 transition-colors text-xs font-bold uppercase tracking-wider"
            >
              <FaFacebook size={14} />
              <span>Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase font-bold">
              [ENTIDAD_HUERFANA]?{" "}
              <Link
                to={"/register"}
                className="text-white hover:text-[#00f0ff] transition-colors ml-2"
              >
                [ CREAR_NUEVO_REGISTRO ]
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
