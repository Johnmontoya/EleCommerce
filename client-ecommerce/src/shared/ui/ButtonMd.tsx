import React, { type ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant: "primary" | "secondary" | "danger";
  text: String,
  disabled?: boolean;
}

const ButtonMd: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  text, 
  disabled = false,
}) => {
    
  const variantClasses: Record<ButtonProps['variant'], string> = {
    primary: "bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-cyan-500/50 shadow-lg",
    secondary: "bg-slate-700 hover:bg-slate-600",
    danger: "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-500/50",
  };

  const colorClasses = variantClasses[variant] || variantClasses.primary;
  
  const disabledStyle = disabled 
    ? "opacity-50 cursor-not-allowed transform-none shadow-none" 
    : "";

  return (
    <button
      onClick={onClick}
      className={` ${colorClasses} ${disabledStyle} text-white px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer`}
    >
      {children}{" "}{text}
    </button>
  );
};

export default ButtonMd;
