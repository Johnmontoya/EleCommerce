import type { User } from "../../types/auth.types";
import TableData from "../../../../shared/ui/TableData";
import UserRow from "./UserRow";

interface TableUserPros {
    currentData: User[];
    selectedData: string[];
    handleSelectAll: () => void;
    handleSelectData: (userId: string) => void;
}

const TableUser: React.FC<TableUserPros> = ({ currentData, selectedData, handleSelectAll, handleSelectData }) => {

    const theader = [
        "Usuario",
        "Contacto",
        "Rol",
        "Estado",
        "Último Acceso",
        "Acciones",
    ];

    return (
        <>
            <TableData theader={theader} Data={currentData} selectedData={selectedData} handleSelectAll={handleSelectAll}>
                {currentData && currentData.length > 0 ? (
                    currentData?.map((user: any) => (
                        <UserRow key={user.id} user={user} selectedData={selectedData} handleSelectData={handleSelectData} />
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

export default TableUser;