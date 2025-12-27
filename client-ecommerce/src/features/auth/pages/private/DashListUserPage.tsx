import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/queries/useUsers";
import TableUser from "../../components/ListUser/TableUser";
import Pagination from "../../../../shared/ui/Pagination";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import DashHeader from "../../../../shared/ui/DashHeader";
import BulkAction from "../../../../shared/ui/BulkAction";
import { useDataActions } from "../../hooks/useDataActions";
import UserFilters from "../../components/ListUser/UserFilters";
import { BiUser } from "react-icons/bi";

const DashListUserPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState<string>("all");
    const [showFilters, setShowFilters] = useState(false);
    const [isActive, setIsActive] = useState<boolean | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    let itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterRole, isActive]);

    const { data: users } = useUsers({
        search: searchTerm,
        isActive: isActive === null ? undefined : isActive,
        role: filterRole === "all" ? undefined : filterRole
    });

    // Calcular índices para "cortar" la lista
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Estos son los usuarios que vas a mostrar en la tabla (IMPORTANTE)
    const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem) || [];

    // Handlers
    const { handleSelectAll, handleSelectData, handleBulkDelete } = useDataActions(users, selectedUsers, setSelectedUsers);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="flex">
                {/** Sidebar */}
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    {/* Mobile Menu */}
                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        {/* Header */}
                        <DashHeader
                            data={users}
                            title="Gestion de Usuarios"
                            titleData="Usuario"
                            path="users"
                            titleIcon={<BiUser className="text-cyan-400" size={36} />}
                            list={true}
                        />

                        {/* Search and Filters Bar */}
                        <UserFilters
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            filterRole={filterRole}
                            setFilterRole={setFilterRole}
                            showFilters={showFilters}
                            setShowFilters={setShowFilters}
                            isActive={isActive}
                            setIsActive={setIsActive}
                        />

                        {/* Bulk Actions */}
                        {selectedUsers.length > 0 && (
                            <BulkAction
                                selectedData={selectedUsers}
                                title="usuarios"
                                handleBulkDelete={handleBulkDelete}
                            />
                        )}

                        <div className="w-[500px] md:w-[420px] lg:w-[680px] xl:w-full 2xl:w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <TableUser
                                    currentData={currentUsers}
                                    selectedData={selectedUsers}
                                    handleSelectAll={handleSelectAll}
                                    handleSelectData={handleSelectData} />
                            </div>

                            {/* Pagination */}
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                indexOfFirstItem={indexOfFirstItem}
                                indexOfLastItem={indexOfLastItem}
                                data={users}
                                title="usuarios" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DashListUserPage;