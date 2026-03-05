import { useDeleteManyProductsMutation } from "./mutation/useProductMutation";
import type { Product } from "../types/product.types";

export const useDataActions = (Data: Product[] | undefined, selectedData: string[], setSelectedData: React.Dispatch<React.SetStateAction<string[]>>) => {
    const deleteSelectMutation = useDeleteManyProductsMutation();

    const handleSelectAll = () => {
        if (!Data) return;
        if (selectedData.length === Data.length) {
            setSelectedData([]);
        } else {
            setSelectedData(Data.map((u: Product) => u.id));
        }
    }

    const handleSelectData = (userId: string) => {
        setSelectedData((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleBulkDelete = () => {
        if (confirm(`¿Estás seguro de eliminar ${selectedData.length} producto(s)?`)) {
            deleteSelectMutation.mutateAsync(selectedData);
            setSelectedData([]);
        }
    };

    return {
        selectedData,
        handleSelectAll,
        handleSelectData,
        handleBulkDelete
    }
}