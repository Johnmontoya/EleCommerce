import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { CiLogout } from "react-icons/ci";
import { useAuthRegisterMutation } from "../../hooks/mutation/useAuthMutation";
import useInputs from "../../../../shared/hooks/useInputs";
import { AxiosError } from "axios";

interface ValidationErrors {
  [key: string]: string[];
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const authRegister = useAuthRegisterMutation();
  const [authData, onChangeAuthData] = useInputs({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: null,
    avatar: "",
    role: "USER",
    isActive: true,
    emailVerified: false
  })

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setValidationErrors({});
    try {
      await authRegister.mutateAsync(authData);
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
    }
  };

  const getFieldsError = (fieldName: string): string | undefined => {
    return validationErrors[fieldName]?.[0];
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

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
                <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-blue-500">
                  ELECOMMERCE
                </span>
              </Link>
              <p className="text-slate-400 text-sm">Ingresa tus credenciales</p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {/* Username Input */}
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Nombre de usuario"
                  value={authData.username}
                  onChange={onChangeAuthData}
                  className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                {getFieldsError("username") && (
                  <p className="text-red-500 text-sm">
                    {getFieldsError("username")}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Correo electrónico"
                  value={authData.email}
                  onChange={onChangeAuthData}
                  className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                {getFieldsError("email") && (
                  <p className="text-red-500 text-sm">
                    {getFieldsError("email")}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={authData.password}
                  onChange={onChangeAuthData}
                  className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                {getFieldsError("password") && (
                  <p className="text-red-500 text-sm">
                    {getFieldsError("password")}
                  </p>
                )}
              </div>

              {/* Sign In Button */}
              <ButtonAction
                onClick={handleSubmit}
                text="Registrarse"
                variant="primary"
                className="w-full flex items-center justify-center"
              >
                <CiLogout size={18} />
              </ButtonAction>
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
              Ya soy miembro{" "}
              <Link
                to={"/login"}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Iniciar Sesion
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
