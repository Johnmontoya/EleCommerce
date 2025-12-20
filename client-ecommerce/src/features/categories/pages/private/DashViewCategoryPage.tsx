import { useState } from "react";
import { useCategory } from "../../hook/queries/useCategory";
import { useNavigate, useParams } from "react-router-dom";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import { BsEye, BsTrash2 } from "react-icons/bs";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { BiEdit } from "react-icons/bi";
import { FiEyeOff } from "react-icons/fi";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../hook/mutation/useCategoryMutation";

const DashViewCategoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: category, isLoading } = useCategory(id!);
    const deleteCategory = useDeleteCategoryMutation();
    const updateCategory = useUpdateCategoryMutation();

    const handleDelete = async () => {
        if (window.confirm(`¿Eliminar "${category?.name}"?`)) {
            await deleteCategory.mutateAsync(id!);
            navigate("/dashboard/categories");
        }
    };

    const handleTogglePublish = async () => {
        if (category) {
            await updateCategory.mutateAsync({
                id: category.id,
                data: { isActive: !category.isActive }
            });
        }
    };

    if (isLoading) return <LoadingFallback />;
    if (!category) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">Categoría no encontrada</p>
                    <button
                        onClick={() => navigate("/dashboard/categories")}
                        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                    >
                        Volver a la lista
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="flex">
                {/* Sidebar */}
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
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h1 className="text-2xl lg:text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
                                        <BsEye className="text-cyan-400" size={36} />
                                        {category.name}
                                    </h1>
                                    <p className="text-slate-400 mt-1">ID: {category.id}</p>
                                </div>
                            </div>
                            <div className="flex lg:flex-row flex-col gap-3">
                                <ButtonAction
                                    variant="outline"
                                    text=""
                                    onClick={handleTogglePublish}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${category.isActive
                                        ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                        }`}
                                >
                                    {category.isActive ? <FiEyeOff size={18} /> : <BsEye size={18} />}
                                    {category.isActive ? "Desactivar" : "Activar"}
                                </ButtonAction>
                                <ButtonAction
                                    onClick={() => navigate(`/dashboard/categories/${category.id}/edit`)}
                                    variant="primary"
                                    text="Editar"
                                >
                                    <BiEdit size={18} />
                                </ButtonAction>
                                <ButtonAction
                                    onClick={handleDelete}
                                    variant="danger"
                                    text="Eliminar"
                                >
                                    <BsTrash2 size={18} />
                                </ButtonAction>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            {/* Main Info */}
                            <div className="space-y-6">
                                {/* Images */}
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                                    <h2 className="text-xl font-bold text-white mb-4">Imagen</h2>
                                    <div className="w-44">
                                        <img
                                            src={category.image}
                                            alt={`${category.name}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* Descripcion */}
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                                    <h2 className="text-xl font-bold text-white mb-4">Descripción</h2>
                                    <p className="text-slate-200">{category.description}</p>
                                </div>

                                {/* Status */}
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                                    <h2 className="text-xl font-bold text-white mb-4">Estado</h2>
                                    <p className="text-slate-200">{category.isActive ? 'Activo' : 'Inactivo'}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashViewCategoryPage;