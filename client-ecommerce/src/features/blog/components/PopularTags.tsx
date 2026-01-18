import React from "react";

interface PopularProps {
  popularTags: string[]
}

const PopularTags: React.FC<PopularProps> = ({ popularTags }) => {
  return (
    <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag) => (
          <button
            key={tag}
            className="bg-slate-700/50 hover:bg-cyan-500/20 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
