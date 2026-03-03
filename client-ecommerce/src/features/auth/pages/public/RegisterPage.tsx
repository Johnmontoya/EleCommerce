import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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

      {/* Register Form */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#050505] border border-zinc-800 p-8 relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#e4ff00]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#e4ff00]" />

          {/* Title */}
          <div className="text-center mb-8 border-b border-zinc-900 pb-6">
            <Link to={"/"} className="block text-3xl font-black text-white uppercase tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              ELECOMMERCE <span className="text-[#e4ff00]">//</span>
            </Link>
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase">
              NEW ENTITY REGISTRATION.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[USER_ALIAS]</label>
              <input
                type="text"
                name="username"
                placeholder="ENTER_ALIAS..."
                value={authData.username}
                onChange={onChangeAuthData}
                className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#e4ff00] transition-colors text-sm font-bold tracking-widest uppercase"
              />
              {getFieldsError("username") && (
                <p className="text-[#ff0055] mt-2 font-bold tracking-widest uppercase text-[10px]">
                  [ERR]: {getFieldsError("username")}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[EMAIL_ADDRESS]</label>
              <input
                type="text"
                name="email"
                placeholder="ENTER_EMAIL..."
                value={authData.email}
                onChange={onChangeAuthData}
                className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#e4ff00] transition-colors text-sm font-bold tracking-widest uppercase"
              />
              {getFieldsError("email") && (
                <p className="text-[#ff0055] mt-2 font-bold tracking-widest uppercase text-[10px]">
                  [ERR]: {getFieldsError("email")}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[SECURITY_KEY]</label>
              <input
                type="password"
                name="password"
                placeholder="ENTER_PASSWORD..."
                value={authData.password}
                onChange={onChangeAuthData}
                className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#e4ff00] transition-colors text-sm font-bold tracking-widest uppercase"
              />
              {getFieldsError("password") && (
                <p className="text-[#ff0055] mt-2 font-bold tracking-widest uppercase text-[10px]">
                  [ERR]: {getFieldsError("password")}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-3 bg-[#e4ff00] hover:bg-white text-black font-black py-4 uppercase tracking-[0.2em] transition-colors border-2 border-transparent hover:border-[#e4ff00]"
            >
              <span>REGISTER_ENTITY</span>
              <CiLogout size={20} className="font-black" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-[10px] tracking-widest uppercase font-bold">
              <span className="px-4 bg-[#050505] text-zinc-600">
                AUXILIARY_METHODS
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
              VERIFIED_ENTITY?{" "}
              <Link
                to={"/login"}
                className="text-white hover:text-[#e4ff00] transition-colors ml-2"
              >
                [ INITIATE_SESSION ]
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
