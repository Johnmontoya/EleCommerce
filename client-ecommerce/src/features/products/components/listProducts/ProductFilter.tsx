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
        <div className="bg-[#050505] border border-zinc-800 border-dashed p-6 relative my-6 font-mono">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative group">
                    <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#00f0ff] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="[BUSCAR_PRODUCTOS...]"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 pl-12 rounded-none outline-none focus:border-[#00f0ff] text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full lg:w-auto px-4 py-3 pr-10 bg-black border border-zinc-800 text-[#00f0ff] hover:bg-zinc-900 rounded-none focus:outline-none focus:border-[#00f0ff] min-w-[200px] text-[10px] font-bold tracking-[0.2em] uppercase appearance-none cursor-pointer transition-colors"
                    >
                        <option value="">[TODAS_LAS_CATEGORIAS]</option>
                        {categories?.map((cat, index) => (
                            <option key={index} value={cat?.id}>{cat?.slug}</option>
                        ))}
                    </select>
                    {/* Select indicator */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#00f0ff] text-[10px]">
                        ▼
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;