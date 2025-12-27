import { useDeleteManyCategoryMutation } from "./mutation/useCategoryMutation";

export const useDataActions = (Data: any[] | undefined, selectedData: string[], setSelectedData: React.Dispatch<React.SetStateAction<string[]>>) => {
    const deleteSelectMutation = useDeleteManyCategoryMutation();

    const handleSelectAll = () => {
        if (!Data) return;
        if (selectedData.length === Data.length) {
            setSelectedData([]);
        } else {
            setSelectedData(Data.map((u: any) => u.id));
        }
    }

    const handleSelectData = (id: string) => {
        setSelectedData((prev) =>
            prev.includes(id)
                ? prev.filter((id) => id !== id)
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
