import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiPackage, BiPlus, BiSearch } from "react-icons/bi";
import { BsEye, BsTrash2 } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import type { Product } from "../../types/product.types";
import { useProducts } from "../../hook/queries/useProduct";
import { useDeleteProductMutation } from "../../hook/mutation/useProductMutation";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import Sidebar from "../../../dashboard/components/Sidebar";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import ButtonAction from "../../../../shared/ui/ButtonAction";

const DashListProductPage = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    // Queries y mutations
    const { data: products, refetch } = useProducts({
        search: searchTerm,
        category: selectedCategory || undefined,
    });

    const deleteProduct = useDeleteProductMutation();

    // Filtros disponibles
    const categories = [...new Set(products?.map(p => p.category) || [])];

    // Handlers
    const handleSelectAll = () => {
        if (selectedProducts.length === products?.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(products?.map(p => p.id) || []);
        }
    };

    const handleSelectProduct = (id: string) => {
        setSelectedProducts(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const handleDelete = async (product: Product) => {
        if (window.confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
            await deleteProduct.mutateAsync(product.id);
            refetch();
        }
    };

    const handleBulkDelete = async () => {
        if (window.confirm(`¿Eliminar ${selectedProducts.length} productos?`)) {
            for (const id of selectedProducts) {
                await deleteProduct.mutateAsync(id);
            }
            setSelectedProducts([]);
            refetch();
        }
    };

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.currentTarget.value)
    };

    const handleRefresh = async () => {
        refetch()
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setSelectedBrand("");
    };


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
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-2xl lg:text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
                                    <BiPackage className="text-cyan-400" size={36} />
                                    Gestión de Productos
                                </h1>
                                <p className="text-slate-400">
                                    {products?.length || 0} productos en total
                                </p>
                            </div>
                            <ButtonAction
                                text="Nuevo Producto"
                                variant="primary"
                                onClick={() => navigate("/dashboard/products/create")}
                            >
                                <BiPlus size={20} />
                            </ButtonAction>
                        </div>

                        {/* Search and Filters */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Actualizar */}
                                <div className="w-20 h-full flex items-center justify-center">
                                    <ButtonAction
                                        text=""
                                        variant="secondary"
                                        onClick={handleRefresh}
                                    >
                                        <GrUpdate size={20} title="Actualizar lista" />
                                    </ButtonAction>
                                </div>
                                {/* Search */}
                                <div className="flex-1 relative">
                                    <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Buscar productos..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-cyan-400"
                                    />
                                </div>

                                {/* Category Filter */}
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-cyan-400 min-w-[200px]"
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories?.map((cat, index) => (
                                        <option key={index} value={cat?.id}>{cat?.slug}</option>
                                    ))}
                                </select>

                                {/* Clear Filters */}
                                {(searchTerm || selectedCategory || selectedBrand) && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                                    >
                                        Limpiar
                                    </button>
                                )}
                            </div>

                            {/* Bulk Actions */}
                            {selectedProducts.length > 0 && (
                                <div className="mt-4 flex items-center gap-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                    <span className="text-cyan-400 font-semibold">
                                        {selectedProducts.length} seleccionado(s)
                                    </span>
                                    <button
                                        onClick={handleBulkDelete}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                    >
                                        Eliminar seleccionados
                                    </button>
                                    <button
                                        onClick={() => setSelectedProducts([])}
                                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Products Table */}
                        <div className="w-[500px] md:w-[420px] lg:w-[680px] xl:w-full 2xl:w-full bg-slate-800/50  backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-700/50 border-b border-slate-600">
                                        <tr>
                                            <th className="p-4 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.length === products?.length}
                                                    onChange={handleSelectAll}
                                                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0"
                                                />
                                            </th>
                                            <th className="p-4 text-left text-slate-300 font-semibold">Producto</th>
                                            <th className="p-4 text-left text-slate-300 font-semibold">Categoría</th>
                                            <th className="p-4 text-left text-slate-300 font-semibold">Precio y descuento</th>
                                            <th className="p-4 text-left text-slate-300 font-semibold">Stock</th>
                                            <th className="p-4 text-left text-slate-300 font-semibold">Estado</th>
                                            <th className="p-4 text-center text-slate-300 font-semibold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products && products.length > 0 ? (
                                            products.map((product) => (
                                                <tr
                                                    key={product.id}
                                                    className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors"
                                                >
                                                    <td className="p-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedProducts.includes(product.id)}
                                                            onChange={() => handleSelectProduct(product.id)}
                                                            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0"
                                                        />
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={product.images?.[0] || "/placeholder.png"}
                                                                alt={product.name}
                                                                className="w-12 h-12 object-cover rounded-lg border-2 border-slate-600"
                                                            />
                                                            <div>
                                                                <p className="text-white font-medium">{product.name}</p>
                                                                <p className="text-sm text-slate-400">{product.brand}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                                                            {product?.category?.slug}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="text-white font-semibold">
                                                            ${Math.round(
                                                                product.price - (product.price * product.priceDiscount!) / 100
                                                            )}
                                                            {product.priceDiscount && (
                                                                <span className="ml-2 text-sm text-green-400">
                                                                    {product.priceDiscount}%
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`font-semibold ${product.stock > 10
                                                            ? "text-green-400"
                                                            : product.stock > 0
                                                                ? "text-yellow-400"
                                                                : "text-red-400"
                                                            }`}>
                                                            {product.stock}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.isPublished
                                                            ? "bg-green-500/20 text-green-400"
                                                            : "bg-gray-500/20 text-gray-400"
                                                            }`}>
                                                            {product.isPublished ? "Publicado" : "Borrador"}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <ButtonAction
                                                                variant="outline"
                                                                onClick={() => navigate(`/dashboard/products/${product.id}`)}
                                                                text=""
                                                            >
                                                                <BsEye size={18} className="text-cyan-400" />
                                                            </ButtonAction>
                                                            <ButtonAction
                                                                variant="outline"
                                                                onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
                                                                text=""
                                                            >
                                                                <BiEdit size={18} className="text-blue-400" />
                                                            </ButtonAction>
                                                            <ButtonAction
                                                                variant="outline"
                                                                onClick={() => handleDelete(product)}
                                                                text=""
                                                            >
                                                                <BsTrash2 size={18} className="text-red-400" />
                                                            </ButtonAction>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="p-12 text-center">
                                                    <p className="text-slate-400 text-lg">No se encontraron productos</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashListProductPage;