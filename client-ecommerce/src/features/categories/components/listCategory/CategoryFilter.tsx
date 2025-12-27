interface CategoryFilterProps {
    selectedCategory: string;
    clearFilters: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    selectedCategory,
    clearFilters,
}) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">

                {/* Clear Filters */}
                {(selectedCategory) && (
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

export default CategoryFilter;