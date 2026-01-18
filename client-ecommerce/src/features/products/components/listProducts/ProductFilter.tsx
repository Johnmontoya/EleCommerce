import { BiSearch } from "react-icons/bi";
import type { Category } from "../../../categories/type/category.types";
import type React from "react";

interface ProductFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: Category[] | undefined;
}

const ProductFilter: React.FC<ProductFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories
}) => {

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.currentTarget.value)
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSelectedCategory(e.target.value)
    };

    return (
        <div className="dash-search-border dark:dash-search-border border border-slate-700 rounded-2xl p-4 backdrop-blur-sm my-6">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full dash-search dark:dash-search border border-slate-700 text-slate-100 placeholder-slate-400 px-4 py-3 pl-10 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                </div>

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="px-4 py-3 bg-slate-900/30 border border-slate-500 text-slate-200 hover:bg-slate-800 text-white rounded-lg focus:outline-none focus:border-cyan-400 min-w-[200px]"
                >
                    <option value="">Todas las categorías</option>
                    {categories?.map((cat, index) => (
                        <option key={index} value={cat?.id}>{cat?.slug}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ProductFilter;