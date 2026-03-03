import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { CiLock } from "react-icons/ci";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useChangePasswordClientMutation } from "../../hooks/mutation/useAuthMutation";
import useInputs from "../../../../shared/hooks/useInputs";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const email = query.get("email");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; otp?: string }>({});
    const { mutateAsync: changePassword } = useChangePasswordClientMutation();
    const [passwords, onChangePasswords] = useInputs({
        current: "",
        new: "",
        confirm: "",
    });

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (
            !/^[0-9]{1}$/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "Tab" &&
            e.key !== "ArrowLeft" &&
            e.key !== "ArrowRight" &&
            !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === "Backspace" || e.key === "Delete") {
            if (e.key === "Backspace" && index > 0 && !otp[index]) {
                // Si presiona backspace y el campo está vacío, ir al anterior
                setOtp((prevOtp) => {
                    const newOtp = [...prevOtp];
                    newOtp[index - 1] = "";
                    return newOtp;
                });
                inputRefs.current[index - 1]?.focus();
            }
        }

        // Navegación con flechas
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (value && /^[0-9]$/.test(value)) {
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                return newOtp;
            });

            // Mover al siguiente campo si existe
            if (index < otp.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");

        if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
            return;
        }

        const digits = text.split("");
        setOtp(digits);

        // Enfocar el último campo
        inputRefs.current[otp.length - 1]?.focus();
    };

    const validateForm = (): boolean => {
        const newErrors: { password?: string; confirmPassword?: string; otp?: string } = {};

        // Validar OTP
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            newErrors.otp = "El código debe tener 6 dígitos";
        }

        // Validar que las contraseñas coincidan
        if (passwords.new !== passwords.confirm) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const otpValue = otp.join("");
            let data = {
                email: email!,
                otp: otpValue,
                password: passwords.new
            };
            await new Promise(resolve => setTimeout(resolve, 2000));

            changePassword(data);
            navigate('/login');
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            setErrors({ password: "Error al cambiar la contraseña. Intenta de nuevo." });
        } finally {
            setLoading(false);
        }
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

            <div className="w-full max-w-md relative z-10 my-10">
                <div className="bg-[#050505] border border-zinc-800 p-8 relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff0055]" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff0055]" />

                    {/* Title */}
                    <div className="text-center mb-8 border-b border-zinc-900 pb-6">
                        <h1 className="text-3xl font-black text-[#ff0055] uppercase tracking-widest mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                            KEY_OVERRIDE //
                        </h1>
                        <p className="text-zinc-500 text-[10px] tracking-widest uppercase">
                            PROVIDE OTP SEQUENCE AND NEW SECURITY KEY.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6">
                        {/* OTP Input */}
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                                [O.T.P._SEQUENCE]
                            </label>
                            <div className="flex flex-row gap-2 justify-between">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInput(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onFocus={handleFocus}
                                        onPaste={handlePaste}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold tracking-widest bg-black border border-zinc-800 text-[#00f0ff] outline-none focus:border-[#ff0055] focus:bg-zinc-900 transition-colors uppercase"
                                        aria-label={`Dígito ${index + 1}`}
                                    />
                                ))}
                            </div>
                            {errors.otp && (
                                <p className="text-[#ff0055] font-bold tracking-widest uppercase text-[10px] mt-2">
                                    [ERR]: {errors.otp}
                                </p>
                            )}
                        </div>

                        {/* New Password Input */}
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                                [NEW_SECURITY_KEY]
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="MIN_8_CHARS"
                                    name="new"
                                    value={passwords.new}
                                    onChange={onChangePasswords}
                                    className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 pr-12 outline-none focus:border-[#ff0055] transition-colors text-sm font-bold tracking-widest uppercase"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors p-2"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-[#ff0055] font-bold tracking-widest uppercase text-[10px] mt-2">
                                    [ERR]: {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                                [CONFIRM_SECURITY_KEY]
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="REPEAT_KEY"
                                    name="confirm"
                                    value={passwords.confirm}
                                    onChange={onChangePasswords}
                                    className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 pr-12 outline-none focus:border-[#ff0055] transition-colors text-sm font-bold tracking-widest uppercase"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors p-2"
                                >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-[#ff0055] font-bold tracking-widest uppercase text-[10px] mt-2">
                                    [ERR]: {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={(e) => handleSubmit(e as any)}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-[#ff0055] hover:bg-white text-black font-black py-4 uppercase tracking-[0.2em] transition-colors border-2 border-transparent hover:border-[#ff0055] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>{loading ? "PROCESSING..." : "UPDATE_KEY"}</span>
                            <CiLock size={20} className="font-black" />
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#00f0ff] transition-colors text-[10px] font-bold uppercase tracking-widest"
                        >
                            <BiArrowBack size={14} />
                            [ ABORT_OPERATION ]
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;