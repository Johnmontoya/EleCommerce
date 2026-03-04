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
        "[ID_CATEGORIA]",
        "[DESCRIPCION]",
        "[ESTADO]",
        "[ACCIONES]",
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
                        <td colSpan={7} className="p-16 text-center border-t border-zinc-800 bg-black">
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                                [NO_HAY_CATEGORIAS_EN_BASE_DE_DATOS]
                            </p>
                        </td>
                    </tr>
                )}
            </TableData>
        </>
    );
};

export default TableCategory;