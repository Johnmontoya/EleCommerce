import { useState } from "react";
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
    const itemsPerPage = 10;

    const { data: categories } = useCategories()

    const onSearchChange = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const onCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

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
        <div className="min-h-screen bg-[#020202] text-white font-mono selection:bg-[#00f0ff] selection:text-black">
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
                            setSearchTerm={onSearchChange}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={onCategoryChange}
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
                        <div className="w-72 sm:w-[500px] md:w-[420px] lg:w-[680px] xl:w-full 2xl:w-full bg-[#050505] border border-zinc-800 relative mt-4">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] z-10" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] z-10" />

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