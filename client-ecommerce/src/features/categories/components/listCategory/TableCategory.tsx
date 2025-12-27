import TableData from "../../../../shared/ui/TableData";
import type { Category } from "../../type/category.types";
import CategoryRow from "./CategoryRow";

interface TableCategoryProps {
    currentData: Category[];
    selectedData: string[];
    handleSelectAll: () => void;
    handleSelectData: (userId: string) => void;
}

const TableCategory: React.FC<TableCategoryProps> = ({
    currentData,
    selectedData,
    handleSelectAll,
    handleSelectData,
}) => {

    const theader = [
        "Categoria",
        "Descripcion",
        "Estado",
        "Acciones",
    ];

    return (
        <>
            <TableData
                theader={theader}
                Data={currentData}
                selectedData={selectedData}
                handleSelectAll={handleSelectAll}
            >
                {currentData && currentData.length > 0 ? (
                    currentData?.map((category: any) => (
                        <CategoryRow
                            key={category.id}
                            category={category}
                            selectData={selectedData}
                            handleSelectData={handleSelectData}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className="p-12 text-center">
                            <p className="text-slate-400 text-lg">No se encontraron categorias</p>
                        </td>
                    </tr>
                )}
            </TableData>
        </>
    );
};

export default TableCategory;