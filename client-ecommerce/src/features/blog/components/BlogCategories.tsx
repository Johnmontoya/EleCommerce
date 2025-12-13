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
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Categories</h3>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li
            key={category.name}
            className="flex items-center justify-between text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              {category.name}
            </span>
            <span className="bg-slate-700 group-hover:bg-cyan-500/20 text-slate-400 group-hover:text-cyan-400 px-2 py-1 rounded-full text-xs font-semibold transition-all">
              {category.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
