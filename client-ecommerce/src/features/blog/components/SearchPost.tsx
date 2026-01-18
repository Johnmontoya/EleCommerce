import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchPost = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };
  return (
    <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Buscar</h3>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Buscar articulos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <BiSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchPost;
