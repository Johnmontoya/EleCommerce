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
        "[USER_IDENT]",
        "[CONTACT_NET]",
        "[SYS_ROLE]",
        "[SYS_STATUS]",
        "[CREATION_CYCLE]",
        "[EXEC]"
    ];

    return (
        <>
            <TableData theader={theader} Data={currentData} selectedData={selectedData} handleSelectAll={handleSelectAll}>
                {currentData && currentData.length > 0 ? (
                    currentData?.map((user: User) => (
                        <UserRow key={user.id} user={user} selectedData={selectedData} handleSelectData={handleSelectData} />
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className="p-12 text-center border-b border-zinc-800 bg-black">
                            <p className="text-[#ff0055] text-[10px] font-bold tracking-[0.2em] uppercase">[SYS_NO_USERS_FOUND: DATABASE_EMPTY_OR_FILTER_MISMATCH]</p>
                        </td>
                    </tr>
                )}
            </TableData>
        </>
    );
};

export default TableUser;