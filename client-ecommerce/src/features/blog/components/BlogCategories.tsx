import React from "react";

interface Category {
  name: string;
  count: number;
}

interface CategoryProps {
  categories: Category[]
}

const BlogCategories: React.FC<CategoryProps> = ({ categories }) => {

  return (
    <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-6">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />
      <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-4">
        LOG_CATEGORIES //
      </h3>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li
            key={category.name}
            className="flex items-center justify-between text-zinc-400 hover:text-[#00f0ff] transition-colors cursor-pointer group border-b border-zinc-800/50 pb-2 last:border-0"
          >
            <span className="group-hover:translate-x-1 transition-transform text-xs tracking-widest uppercase">
              {category.name}
            </span>
            <span className="bg-black text-zinc-500 group-hover:text-[#00f0ff] border border-zinc-800 group-hover:border-[#00f0ff]/50 px-2 py-0.5 text-[10px] font-bold transition-all">
              {category.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
