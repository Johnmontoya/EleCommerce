import React, { type ReactNode } from "react";

interface ButtonProps {
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  variant: "primary" | "secondary" | "danger" | "outline" | "edit" | "delete" | "view";
  text: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ButtonAction: React.FC<ButtonProps> = ({
  className = "",
  onClick,
  children,
  variant = "primary",
  text,
  disabled = false,
  type = "button",
}) => {
  // Mapa de Clases: Define todos los estilos de las variantes aquí
  const variantClasses: Record<ButtonProps["variant"], string> = {
    primary:
      "bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/20 shadow-[0_0_10px_rgba(0,240,255,0.15)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]",
    secondary: "bg-black border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white",
    danger:
      "bg-[#ff0055]/10 border border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055]/20 shadow-[0_0_10px_rgba(255,0,85,0.15)] hover:shadow-[0_0_15px_rgba(255,0,85,0.3)]",
    outline: "bg-transparent border border-zinc-700 text-zinc-400 hover:border-[#00f0ff] hover:text-[#00f0ff]",
    edit: "bg-transparent border border-[#e4ff00] text-[#e4ff00] hover:bg-[#e4ff00]/20 p-2 rounded-none transition-all shadow-[0_0_8px_rgba(228,255,0,0.15)]",
    delete: "bg-transparent border border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055]/20 p-2 rounded-none transition-all shadow-[0_0_8px_rgba(255,0,85,0.15)]",
    view: "bg-black border border-zinc-700 text-zinc-400 hover:border-[#00f0ff] hover:text-[#00f0ff] p-2 rounded-none transition-all"
  };

  const colorClasses = variantClasses[variant] || variantClasses.primary;

  const disabledStyle = disabled
    ? "opacity-30 cursor-not-allowed hover:bg-transparent hover:shadow-none hover:border-zinc-700"
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${colorClasses} ${disabledStyle} px-6 py-3 rounded-none font-mono font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer w-max`}
    >
      {children} {text && `[${text}]`}
    </button>
  );
};

export default ButtonAction;