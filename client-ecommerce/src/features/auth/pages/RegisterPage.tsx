import { useState } from "react"
import { CiLock, CiShoppingBasket } from "react-icons/ci"
import { FaFacebook, FaGoogle } from "react-icons/fa"
import { MdOutlineMailOutline } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Login attempt:", { email, password, rememberMe });
    };
  
    const handleSocialLogin = (provider: string) => {
      console.log(`Login with ${provider}`);
    };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
          
          {/* Login Form */}
          <div className="flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 my-20 backdrop-blur-sm">
                {/* Title */}
                <div className="text-center mb-8">
                  <Link to={'/'} className="text-3xl font-bold text-slate-100 mb-2">
                    Bienvenido de nuevo a <span className="text-cyan-400">ELECOMMERCE</span>
                  </Link>
                  <p className="text-slate-400 text-sm">
                    Ingresa tus credenciales
                  </p>
                </div>
    
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                   {/* Username Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre de usuario"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>

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
    
                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-100 font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50"
                  >
                    Registrarse
                  </button>
                </form>
    
                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-800/50 text-slate-400">
                      O registrate con
                    </span>
                  </div>
                </div>
    
                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin("Google")}
                    className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-medium group"
                  >
                    <span className="text-lg"><FaGoogle /></span>
                    <span className="text-sm">Google</span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin("Facebook")}
                    className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-medium group"
                  >
                    <span className="text-lg"><FaFacebook /></span>
                    <span className="text-sm">Facebook</span>
                  </button>
                </div>
    
                {/* Sign Up Link */}
                <p className="text-center text-slate-400 text-sm mt-6">
                  Ya soy miembro{" "}
                  <Link
                    to={'/login'}
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    Iniciar Sesion
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default RegisterPage