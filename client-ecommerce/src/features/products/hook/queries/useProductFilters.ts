import { useMemo, useState } from "react";
import type { ProductFilters } from "../../types/product.types";
import type { Category } from "../../../categories/type/category.types";

export const useProductFilters = () => {
    const [filters, setFilters] = useState<ProductFilters>({
        category: undefined,
        brands: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        search: undefined,
        isPublished: true
    });

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
    const [selectedCategoryObj, setSelectedCategoryObj] = useState<Category | undefined>();

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev => {
            const newBrands = prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand];

            // Actualizar filtros con la primera marca seleccionada
            // o undefined si no hay ninguna
            setFilters(f => ({
                ...f,
                brands: newBrands.length > 0 ? newBrands : undefined
            }));

            return newBrands;
        });
    };

    // Actualizar rango de precio
    const updatePriceRange = (min: number, max: number) => {
        setPriceRange([min, max]);
        setFilters(f => ({
            ...f,
            minPrice: min > 0 ? min : undefined,
            maxPrice: max < 1000000 ? max : undefined,
        }));
    };

    // Actualizar categoría
    const setCategory = (category: Category | undefined) => {
        setSelectedCategoryObj(category);
        setFilters(f => ({ ...f, category: category?.id }));
    };

    // Actualizar búsqueda
    const setSearch = (search: string | undefined) => {
        setFilters(f => ({ ...f, search }));
    };

    // Limpiar todos los filtros
    const clearFilters = () => {
        setFilters({
            category: undefined,
            brands: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            search: undefined,
            isPublished: true,
        });
        setSelectedBrands([]);
        setPriceRange([0, 1000]);
        setSelectedCategoryObj(undefined);
    };

    // Contar filtros activos
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.category) count++;
        if (selectedBrands.length > 0) count++;
        if (filters.minPrice || filters.maxPrice) count++;
        if (filters.search) count++;
        return count;
    }, [filters, selectedBrands]);

    return {
        filters,
        selectedBrands,
        priceRange,
        selectedCategoryObj,
        toggleBrand,
        updatePriceRange,
        setCategory,
        setSearch,
        clearFilters,
        activeFiltersCount,
    };
}
