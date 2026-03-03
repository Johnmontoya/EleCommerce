import { useState } from "react";
import { useCategory } from "../../hook/queries/useCategory";
import { useNavigate, useParams } from "react-router-dom";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import { BsEye, BsTrash2 } from "react-icons/bs";
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
            <div className="min-h-screen bg-[#020202] text-white font-mono flex items-center justify-center">
                <div className="text-center border border-[#ff0055]/30 bg-[#ff0055]/5 p-12">
                    <p className="text-[#ff0055] text-lg font-bold uppercase tracking-widest mb-6">[ERROR: CATEGORY_NOT_FOUND]</p>
                    <button
                        onClick={() => navigate("/dashboard/categories")}
                        className="px-6 py-3 border border-zinc-800 bg-black text-zinc-500 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all font-bold tracking-widest text-xs uppercase"
                    >
                        [RETURN_TO_DIRECTORY]
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-[#020202] text-white font-mono selection:bg-[#00f0ff] selection:text-black">
            <div className="flex">
                {/* Sidebar */}
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
                        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h1 className="text-2xl lg:text-4xl font-black text-white mb-2 flex items-center gap-3 uppercase tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                        <BsEye className="text-[#00f0ff]" size={36} />
                                        {category.name}
                                    </h1>
                                    <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase mt-1">// TARGET_ID: {category.id} //</p>
                                </div>
                            </div>
                            <div className="flex lg:flex-row flex-col gap-4">
                                <button
                                    onClick={handleTogglePublish}
                                    className={`flex items-center gap-2 px-6 py-3 border transition-all font-bold uppercase tracking-widest text-xs ${category.isActive
                                        ? "border-[#ff0055] bg-[#ff0055]/10 text-[#ff0055] hover:bg-[#ff0055] hover:text-white"
                                        : "border-[#e4ff00] bg-[#e4ff00]/10 text-[#e4ff00] hover:bg-[#e4ff00] hover:text-black"
                                        }`}
                                >
                                    {category.isActive ? <FiEyeOff size={18} /> : <BsEye size={18} />}
                                    {category.isActive ? "[DEACTIVATE]" : "[ACTIVATE]"}
                                </button>
                                <button
                                    onClick={() => navigate(`/dashboard/categories/${category.id}/edit`)}
                                    className="flex items-center gap-2 px-6 py-3 border border-zinc-800 bg-black text-zinc-500 hover:text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all font-bold uppercase tracking-widest text-xs"
                                >
                                    <BiEdit size={18} />
                                    [EDIT_RECORD]
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 px-6 py-3 border border-zinc-800 bg-black text-zinc-500 hover:text-[#ff0055] hover:border-[#ff0055] hover:bg-[#ff0055]/10 transition-all font-bold uppercase tracking-widest text-xs"
                                >
                                    <BsTrash2 size={18} />
                                    [DELETE_NODE]
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Images */}
                            <div className="w-full lg:w-1/3">
                                <div className="border border-zinc-800 bg-[#050505] p-6 relative group overflow-hidden">
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />
                                    <h2 className="text-[#00f0ff] text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] mb-4">
                                        [CATEGORY_IMAGE_DATA]
                                    </h2>
                                    <div className="w-full h-64 border border-zinc-800 bg-black relative p-1 overflow-hidden flex items-center justify-center">
                                        <div className="absolute inset-0 bg-[#00f0ff]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        <img
                                            src={category.image}
                                            alt={`${category.name}`}
                                            className="w-full h-full object-contain grayscale mix-blend-screen opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Main Info */}
                            <div className="w-full lg:w-2/3 space-y-6 flex flex-col">
                                {/* Descripcion */}
                                <div className="border border-zinc-800 bg-[#050505] p-6 relative flex-1">
                                    <h2 className="text-[#00f0ff] text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] mb-4">
                                        [DESCRIPTION_MANIFEST]
                                    </h2>
                                    <p className="text-zinc-300 font-mono text-sm leading-relaxed border-l border-zinc-900 pl-4 py-2">
                                        {category.description}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="border border-zinc-800 bg-[#050505] p-6 relative flex flex-row items-center justify-between">
                                    <h2 className="text-[#00f0ff] text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] m-0">
                                        [SYSTEM_STATUS]
                                    </h2>
                                    <span className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${category.isActive
                                        ? "border-[#e4ff00]/30 bg-[#e4ff00]/5 text-[#e4ff00]"
                                        : "border-[#ff0055]/30 bg-[#ff0055]/5 text-[#ff0055]"
                                        }`}>
                                        {category.isActive ? '[ACTIVE]' : '[INACTIVE]'}
                                    </span>
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