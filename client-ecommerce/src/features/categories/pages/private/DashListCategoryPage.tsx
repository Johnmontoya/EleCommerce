import { useState } from "react";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import NavMobile from "../../../dashboard/components/NavMobile";
import Sidebar from "../../../dashboard/components/Sidebar";
import { BiEdit, BiPackage, BiPlus } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hook/queries/useCategory";
import { GrUpdate } from "react-icons/gr";
import { BsEye, BsTrash2 } from "react-icons/bs";
import type { Category } from "../../type/category.types";
import { useDeleteCategoryMutation } from "../../hook/mutation/useCategoryMutation";

const DashListCategoryPage = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>("");
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const { data: categories, refetch } = useCategories({
        category: selectedCategory || undefined,
    });

    const deleteCategory = useDeleteCategoryMutation();

    const handleSelectAll = () => {
        if (selectedProducts.length === categories?.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(categories?.map(p => p.id) || []);
        }
    };

    const handleSelectProduct = (id: string) => {
        setSelectedProducts(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = async () => {
        /*if (window.confirm(`¿Eliminar ${selectedProducts.length} productos?`)) {
            for (const id of selectedProducts) {
                await deleteProduct.mutateAsync(id);
            }
            setSelectedProducts([]);
            refetch();
        }*/
    };

    const handleDelete = async (category: Category) => {
        if (window.confirm(`¿Estás seguro de eliminar "${category.name}"?`)) {
            await deleteCategory.mutateAsync(category.id);
            refetch();
        }
    };

    const handleRefresh = async () => {
        refetch()
    };

    const clearFilters = () => {
        setSelectedCategory("");
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
                                    Gestión de Categorias
                                </h1>
                                <p className="text-slate-400">
                                    {categories?.length || 0} categorias en total
                                </p>
                            </div>
                            <ButtonAction
                                text="Nueva Categoria"
                                variant="primary"
                                onClick={() => navigate("/dashboard/categories/create")}
                            >
                                <BiPlus size={20} />
                            </ButtonAction>
                        </div>

                        {/* List */}
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

                                {/* Clear Filters */}
                                {(selectedCategory) && (
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

                        {/* Table */}
                        <div className="w-[500px] md:w-[420px] lg:w-[680px] xl:w-full 2xl:w-full bg-slate-800/50  backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-700/50 border-b border-slate-600">
                                        <tr>
                                            <th className="p-4 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.length === categories?.length}
                                                    onChange={handleSelectAll}
                                                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0"
                                                />
                                            </th>
                                            <th className="p-4 text-left text-slate-300 font-semibold">Categoria</th>
                                            <th className="p-4 text-left text-slate-300 font-semibold">Descripcion</th>
                                            <th className="p-4 text-left text-slate-300 font-semibold">Estado</th>
                                            <th className="p-4 text-center text-slate-300 font-semibold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories && categories?.length > 0 ? (
                                            categories?.map((category) => (
                                                <tr key={category.id}
                                                    className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors"
                                                >
                                                    <td className="p-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedProducts.includes(category.id)}
                                                            onChange={() => handleSelectProduct(category.id)}
                                                            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0"
                                                        />
                                                    </td>
                                                    <td className="p-4 text-slate-300">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={category.image || "/placeholder.png"}
                                                                alt={category.name}
                                                                className="w-12 h-12 object-cover rounded-lg border-2 border-slate-600"
                                                            />
                                                            <div>
                                                                <p className="text-white font-medium">{category.name}</p>
                                                                <p className="text-sm text-slate-400">{category.slug}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-slate-300">{category.description}</td>
                                                    <td className="p-4">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.isActive
                                                            ? "bg-green-500/20 text-green-400"
                                                            : "bg-gray-500/20 text-gray-400"
                                                            }`}>
                                                            {category.isActive ? "Activo" : "Inactivo"}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <ButtonAction
                                                                variant="outline"
                                                                onClick={() => navigate(`/dashboard/categories/${category.id}`)}
                                                                text=""
                                                            >
                                                                <BsEye size={18} className="text-cyan-400" />
                                                            </ButtonAction>
                                                            <ButtonAction
                                                                variant="outline"
                                                                onClick={() => navigate(`/dashboard/categories/${category.id}/edit`)}
                                                                text=""
                                                            >
                                                                <BiEdit size={18} className="text-blue-400" />
                                                            </ButtonAction>
                                                            <ButtonAction
                                                                variant="outline"
                                                                onClick={() => handleDelete(category)}
                                                                text=""
                                                            >
                                                                <BsTrash2 size={18} className="text-red-400" />
                                                            </ButtonAction>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))) : (
                                            <tr>
                                                <td colSpan={7} className="p-12 text-center">
                                                    <p className="text-slate-400 text-lg">No hay categorias</p>
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

export default DashListCategoryPage;