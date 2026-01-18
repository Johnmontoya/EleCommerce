import { useEffect, useState } from "react";
import { BiPackage } from "react-icons/bi";
import { useProducts } from "../../hook/queries/useProduct";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import Sidebar from "../../../dashboard/components/Sidebar";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import DashHeader from "../../../../shared/ui/DashHeader";
import BulkAction from "../../../../shared/ui/BulkAction";
import ProductFilter from "../../components/listProducts/ProductFilter";
import TableProduct from "../../components/listProducts/TableProduct";
import { useDataActions } from "../../hook/useDataActions";
import Pagination from "../../../../shared/ui/Pagination";
import { useCategories } from "../../../categories/hook/queries/useCategory";

const DashListProductPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    let itemsPerPage = 10;

    const { data: categories } = useCategories()

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    // Queries y mutations
    const { data: products } = useProducts({
        search: searchTerm,
        category: selectedCategory || undefined,
    });

    // Calcular índices para "cortar" la lista
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Estos son los usuarios que vas a mostrar en la tabla (IMPORTANTE)
    const currentProducts = products?.slice(indexOfFirstItem, indexOfLastItem) || [];

    // Handlers
    const { handleSelectAll, handleSelectData, handleBulkDelete } = useDataActions(products, selectedProducts, setSelectedProducts);

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
                            data={products}
                            title="Gestion de Productos"
                            titleData="Producto"
                            path="products"
                            titleIcon={<BiPackage className="text-cyan-400" size={36} />}
                            list={true}
                        />

                        {/* Search and Filters Bar */}
                        <ProductFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categories={categories}
                        />

                        {/* Bulk Actions */}
                        {selectedProducts.length > 0 && (
                            <BulkAction
                                selectedData={selectedProducts}
                                title="productos"
                                handleBulkDelete={handleBulkDelete}
                            />
                        )}


                        {/* Products Table */}
                        <div className="w-[500px] md:w-[420px] lg:w-[680px] xl:w-full 2xl:w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <TableProduct
                                    currentData={currentProducts}
                                    selectedData={selectedProducts}
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
                                data={products}
                                title="productos" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashListProductPage;