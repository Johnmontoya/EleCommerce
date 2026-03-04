import TableData from "../../../../shared/ui/TableData";
import type { Product } from "../../types/product.types";
import ProductRow from "./ProductRow";

interface TableProductProps {
    currentData: Product[];
    selectedData: string[];
    handleSelectAll: () => void;
    handleSelectData: (userId: string) => void;
}

const TableProduct: React.FC<TableProductProps> = ({ currentData, selectedData, handleSelectAll, handleSelectData }) => {

    const theader = [
        "Producto",
        "Categoria",
        "Precio y Descuento",
        "Stock",
        "Estado",
        "Acciones",
    ];

    return (
        <>
            <TableData theader={theader} Data={currentData} selectedData={selectedData} handleSelectAll={handleSelectAll}>
                {currentData && currentData.length > 0 ? (
                    currentData?.map((product: any) => (
                        <ProductRow key={product.id} product={product} selectedData={selectedData} handleSelectData={handleSelectData} />
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="p-12 text-center bg-[#050505] border-t border-zinc-900 border-dashed">
                            <p className="text-[#ff0055] text-[10px] font-mono tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#ff0055] animate-ping"></span>
                                [ERROR: NO_HAY_PRODUCTOS]
                            </p>
                        </td>
                    </tr>
                )}
            </TableData>
        </>
    );
};

export default TableProduct;