import { useDeleteManyCategoryMutation } from "./mutation/useCategoryMutation";
import type { Category } from "../type/category.types";

export const useDataActions = (Data: Category[] | undefined, selectedData: string[], setSelectedData: React.Dispatch<React.SetStateAction<string[]>>) => {
    const deleteSelectMutation = useDeleteManyCategoryMutation();

    const handleSelectAll = () => {
        if (!Data) return;
        if (selectedData.length === Data.length) {
            setSelectedData([]);
        } else {
            setSelectedData(Data.map((u: Category) => u.id).filter((id): id is string => id !== undefined));
        }
    }

    const handleSelectData = (id: string) => {
        setSelectedData((prev) =>
            prev.includes(id)
                ? prev.filter((prevId) => prevId !== id)
                : [...prev, id]
        );
    };

    const handleBulkDelete = () => {
        if (confirm(`¿Estás seguro de eliminar ${selectedData.length} categoria(s)?`)) {
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
