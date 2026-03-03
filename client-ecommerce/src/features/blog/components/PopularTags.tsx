import React from "react";

interface PopularProps {
  popularTags: string[]
}

const PopularTags: React.FC<PopularProps> = ({ popularTags }) => {
  return (
    <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-6">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />
      <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-4">
        TRENDING_TAGS //
      </h3>
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag) => (
          <button
            key={tag}
            className="bg-black hover:bg-[#00f0ff]/10 border border-zinc-800 hover:border-[#00f0ff] text-zinc-500 hover:text-[#00f0ff] px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-all"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
