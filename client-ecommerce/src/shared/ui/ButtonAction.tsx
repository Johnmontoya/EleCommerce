import React, { type ReactNode } from "react";

interface ButtonProps {
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  variant: "primary" | "secondary" | "danger" | "outline" | "edit" | "delete";
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
      "bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-cyan-500/50 shadow-lg",
    secondary: "bg-slate-700 hover:bg-slate-600",
    danger:
      "bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-500/50 shadow-lg",
    outline: "shadow-lg",
    edit: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-1 rounded-lg transition-all",
    delete: "bg-red-500/20 hover:bg-red-500/30 text-red-400 p-1 rounded-lg transition-all"
  };

  const colorClasses = variantClasses[variant] || variantClasses.primary;

  const disabledStyle = disabled
    ? "opacity-50 cursor-not-allowed transform-none shadow-none"
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${colorClasses} ${disabledStyle} text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer`}
    >
      {children} {text}
    </button>
  );
};

export default ButtonAction;