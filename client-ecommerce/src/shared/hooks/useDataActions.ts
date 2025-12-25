export const useDataActions = (Data: any[] | undefined, selectedData: string[], setSelectedData: React.Dispatch<React.SetStateAction<string[]>>) => {
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
        if (
            confirm(
                `¿Estás seguro de eliminar ${selectedData.length} usuario(s)?`
            )
        ) {
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