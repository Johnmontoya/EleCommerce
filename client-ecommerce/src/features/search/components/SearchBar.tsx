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
  placeholder = "[INPUT_SEARCH_QUERY_DOM...]",
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
    <form onSubmit={handleSubmit} className="relative w-full group">
      {/* External decorative glow lines */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff]/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm"></div>

      <div className="relative flex items-center pl-4 pr-1 gap-2 bg-[#050505] border border-zinc-700 group-focus-within:border-[#00f0ff] shadow-inner h-[50px] overflow-hidden w-full transition-colors">
        {/* Terminal decorative block */}
        <div className="h-full w-2 bg-[#00f0ff] animate-pulse"></div>

        <BiSearch size={22} className="text-[#00f0ff] mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full outline-none text-sm text-zinc-100 font-mono tracking-wider bg-transparent placeholder-zinc-700 uppercase"
          placeholder={placeholder}
        />
        {isLoading ? (
          <div className="mr-4">
            <div className="animate-spin h-5 w-5 border border-[#00f0ff] border-t-transparent rounded-none" />
          </div>
        ) : (
          <button
            type="submit"
            className="bg-[#00f0ff]/10 border border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black w-32 h-[38px] text-[10px] text-[#00f0ff] font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            [EXECUTE]
          </button>
        )}
      </div>
    </form>
  );
};