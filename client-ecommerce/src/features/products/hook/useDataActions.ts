import { useDeleteManyProductsMutation } from "./mutation/useProductMutation";

export const useDataActions = (Data: any[] | undefined, selectedData: string[], setSelectedData: React.Dispatch<React.SetStateAction<string[]>>) => {
    const deleteSelectMutation = useDeleteManyProductsMutation();

    const handleSelectAll = () => {
        if (!Data) return;
        if (selectedData.length === Data.length) {
            setSelectedData([]);
        } else {
            setSelectedData(Data.map((u: any) => u.id));
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