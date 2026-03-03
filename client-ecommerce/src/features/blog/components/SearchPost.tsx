import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchPost = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };
  return (
    <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />
      <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-4">
        SYS_SEARCH //
      </h3>
      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          placeholder="ENTER_QUERY..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 outline-none focus:border-[#00f0ff] transition-colors text-xs font-bold uppercase tracking-widest"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#00f0ff] transition-colors"
        >
          <BiSearch size={18} />
        </button>
      </form>
    </div>
  );
};

export default SearchPost;
