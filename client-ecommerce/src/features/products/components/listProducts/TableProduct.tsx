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
                        <td colSpan={7} className="p-12 text-center">
                            <p className="text-slate-400 text-lg">No se encontraron productos</p>
                        </td>
                    </tr>
                )}
            </TableData>
        </>
    );
};

export default TableProduct;