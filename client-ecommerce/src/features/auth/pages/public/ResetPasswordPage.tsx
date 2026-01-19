import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import ButtonAction from "../../../../shared/ui/ButtonAction";
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
        <div className="min-h-screen background-light dark:background-light">
            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 my-20 backdrop-blur-sm">
                        {/* Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-100 mb-2">
                                Cambia tu contraseña
                            </h1>
                            <p className="text-slate-400 text-sm mt-3">
                                Ingresa el código de 6 dígitos que enviamos a tu correo y tu nueva contraseña
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-5">
                            {/* OTP Input */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Código de verificación
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
                                            className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-semibold bg-slate-700/50 border border-slate-600 text-slate-100 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                                            aria-label={`Dígito ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                {errors.otp && (
                                    <p className="text-red-400 text-sm mt-2">{errors.otp}</p>
                                )}
                            </div>

                            {/* New Password Input */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Nueva contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mínimo 8 caracteres"
                                        name="new"
                                        value={passwords.new}
                                        onChange={onChangePasswords}
                                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 pr-12 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <AiOutlineEyeInvisible size={20} />
                                        ) : (
                                            <AiOutlineEye size={20} />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-400 text-sm mt-2">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Confirmar contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Repite tu contraseña"
                                        name="confirm"
                                        value={passwords.confirm}
                                        onChange={onChangePasswords}
                                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 pr-12 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <AiOutlineEyeInvisible size={20} />
                                        ) : (
                                            <AiOutlineEye size={20} />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <ButtonAction
                                onClick={handleSubmit}
                                text={loading ? "Cambiando..." : "Cambiar contraseña"}
                                variant="primary"
                                className="w-full flex items-center justify-center"
                                disabled={loading}
                            >
                                <CiLock size={18} />
                            </ButtonAction>
                        </form>

                        {/* Back to Login */}
                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                            >
                                <BiArrowBack size={18} />
                                Volver al inicio de sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;