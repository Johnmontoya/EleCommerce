import { useState } from "react";
import { categories } from "../../const/menuCategory";

const CardCategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Laptops");
  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Categorías</h3>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                selectedCategory === category
                  ? "bg-cyan-500/20 text-cyan-400 font-semibold"
                  : "text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50"
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardCategoryList;
