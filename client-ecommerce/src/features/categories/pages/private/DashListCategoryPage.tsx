import { useEffect, useState } from "react";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import NavMobile from "../../../dashboard/components/NavMobile";
import Sidebar from "../../../dashboard/components/Sidebar";
import { BiCategory } from "react-icons/bi";
import { useCategories } from "../../hook/queries/useCategory";
import BulkAction from "../../../../shared/ui/BulkAction";
import DashHeader from "../../../../shared/ui/DashHeader";
import TableCategory from "../../components/listCategory/TableCategory";
import Pagination from "../../../../shared/ui/Pagination";
import { useDataActions } from "../../hook/useDataActions";
import CategoryFilter from "../../components/listCategory/CategoryFilter";

const DashListCategoryPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [isActive, setIsActive] = useState<boolean | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    let itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [isActive]);

    const { data: categories } = useCategories({
        isPublished: isActive === null ? undefined : isActive,
    });

    // Calcular índices para "cortar" la lista
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Estos son los usuarios que vas a mostrar en la tabla (IMPORTANTE)
    const currentCategories = categories?.slice(indexOfFirstItem, indexOfLastItem) || [];

    const { handleSelectAll, handleSelectData, handleBulkDelete } = useDataActions(categories, selectedProducts, setSelectedProducts);

    return (
        <div className="min-h-screen background-light dark:background-light">
            <div className="flex">
                {/** Sidebar */}
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    {/* Mobile Menu */}
                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-8 md:px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        {/* Header */}
                        <DashHeader
                            data={categories}
                            title="Gestion de Categorias"
                            titleData="Categoria"
                            path="categories"
                            titleIcon={<BiCategory className="text-cyan-400" size={36} />}
                            list={true} />

                        <CategoryFilter
                            showFilters={showFilters}
                            setShowFilters={setShowFilters}
                            isActive={isActive}
                            setIsActive={setIsActive}
                        />

                        {/* Bulk Actions */}
                        {selectedProducts.length > 0 && (
                            <BulkAction
                                selectedData={selectedProducts}
                                title="categorias"
                                handleBulkDelete={handleBulkDelete}
                            />
                        )}

                        {/* Table */}
                        <div className="w-[500px] md:w-[420px] lg:w-[680px] xl:w-full 2xl:w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm my-6">
                            <div className="overflow-x-auto">
                                <TableCategory
                                    currentData={currentCategories}
                                    selectedData={selectedProducts}
                                    handleSelectAll={handleSelectAll}
                                    handleSelectData={handleSelectData}
                                />
                            </div>

                            {/* Pagination */}
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                indexOfFirstItem={indexOfFirstItem}
                                indexOfLastItem={indexOfLastItem}
                                data={categories}
                                title="categorias" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashListCategoryPage;