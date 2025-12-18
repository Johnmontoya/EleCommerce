import React, { useRef, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  onSubmit?: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  isLoading,
  onSubmit,
  placeholder = "Buscar productos...",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus cuando se monta
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center border pl-4 gap-2 bg-white border-slate-600/30 h-[46px] rounded-full overflow-hidden w-full">
        <BiSearch size={24} className="text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full outline-none text-sm text-slate-700 bg-transparent"
          placeholder={placeholder}
        />
        {isLoading ? (
          <div className="mr-4">
            <div className="animate-spin h-5 w-5 border-2 border-cyan-400 border-t-transparent rounded-full" />
          </div>
        ) : (
          <button
            type="submit"
            className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 w-32 h-9 rounded-full text-sm text-white mr-[5px] font-semibold transition-all"
          >
            Buscar
          </button>
        )}
      </div>
    </form>
  );
};