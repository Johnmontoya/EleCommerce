import { Link } from "react-router-dom";
import { useState } from "react";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { CiLogin } from "react-icons/ci";
import { useForgotPasswordMutation } from "../../hooks/mutation/useAuthMutation";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>("");
    const forgotPasswordMutation = useForgotPasswordMutation();

    const handleSubmit = () => {
        if (!email) return;
        forgotPasswordMutation.mutate(email);
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
                                Recupera tu cuenta{" "}
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-blue-500">ELECOMMERCE</span>
                            </Link>
                            <p className="text-slate-400 text-sm">Ingresa tu correo electrónico para restablecer tu contraseña</p>
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

                            {/* Sign In Button */}
                            <ButtonAction
                                onClick={handleSubmit}
                                text="Enviar correo"
                                variant="primary"
                                className="w-full flex items-center justify-center"
                            >
                                <CiLogin size={18} />
                            </ButtonAction>
                        </form>

                        {/* Sign Up Link */}
                        <p className="text-center text-slate-400 text-sm mt-6">
                            ¿Ya tienes una cuenta?{" "}
                            <Link
                                to={"/login"}
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;