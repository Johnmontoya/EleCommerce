import { Link } from "react-router-dom";
import { useState } from "react";
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

            {/* Forgot Password Form */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#050505] border border-zinc-800 p-8 relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff0055]" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff0055]" />

                    {/* Title */}
                    <div className="text-center mb-8 border-b border-zinc-900 pb-6">
                        <h1 className="text-3xl font-black text-[#ff0055] uppercase tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                            RECUPERACION DE CUENTA //
                        </h1>
                        <p className="text-zinc-500 text-[10px] tracking-widest uppercase">
                            RECUPERE LA CUENTA CON UN CORREO ELECTRONICO
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[CORREO_ELECTRONICO]</label>
                            <input
                                type="text"
                                placeholder="[INGRESE_CORREO]..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#ff0055] transition-colors text-sm font-bold tracking-widest uppercase"
                            />
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full flex items-center justify-center gap-3 bg-[#ff0055] hover:bg-white text-black font-black py-4 uppercase tracking-[0.2em] transition-colors border-2 border-transparent hover:border-[#ff0055]"
                        >
                            <span>ENLACE_DE_RECUPERACION</span>
                            <CiLogin size={20} className="font-black" />
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
                        <p className="text-zinc-500 text-[10px] tracking-widest uppercase font-bold">
                            ABORTAR_SOBREESCRITURA?{" "}
                            <Link
                                to={"/login"}
                                className="text-white hover:text-[#00f0ff] transition-colors ml-2"
                            >
                                [ REGRESAR_AL_LOGIN ]
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;