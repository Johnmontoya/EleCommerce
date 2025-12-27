import { BiSearch } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { GrUpdate } from "react-icons/gr";
import type { Category } from "../../../categories/type/category.types";
import type React from "react";

interface ProductFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: Category[];
    selectedBrand: string;
    setSelectedBrand: (brand: string) => void;
}

const ProductFilter: React.FC<ProductFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedBrand,
    setSelectedBrand,
}) => {

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.currentTarget.value)
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setSelectedBrand("");
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 my-6">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-cyan-400"
                    />
                </div>

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-cyan-400 min-w-[200px]"
                >
                    <option value="">Todas las categorías</option>
                    {categories?.map((cat, index) => (
                        <option key={index} value={cat?.id}>{cat?.slug}</option>
                    ))}
                </select>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory || selectedBrand) && (
                    <button
                        onClick={clearFilters}
                        className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                        Limpiar
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductFilter;