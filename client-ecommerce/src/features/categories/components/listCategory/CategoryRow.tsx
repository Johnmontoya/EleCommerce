import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation } from "../../hook/mutation/useCategoryMutation";
import type { Category } from "../../type/category.types";

import { BiEdit } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdBlock, MdCheckCircle } from "react-icons/md";
import SweetAlertas from "../../../../shared/ui/SweetAlertas";

interface CategoryRowProps {
    category: Category;
    selectData: string[];
    handleSelectData: (id: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, selectData, handleSelectData }) => {
    const navigate = useNavigate();
    const deletecategory = useDeleteCategoryMutation();

    const Cancel = () => { };

    const ConfirmDeleteBlog = (id: string) => {
        deletecategory.mutateAsync(id);
    };

    const handleDelete = (categoria: Category) => {
        SweetAlertas.OnDialogChoose({
            message: `Estas seguro de eliminar la categoria ${categoria.name}`,
            onConfirm: () => ConfirmDeleteBlog(categoria.id!),
            onCancel: Cancel,
        });
    };

    return (
        <tr
            key={category?.id}
            className="text-center border-t border-zinc-800 bg-[#050505] hover:bg-[#00f0ff]/5 transition-colors group font-mono"
        >
            <td className="px-6 py-4">
                <label className="flex gap-3 items-center cursor-pointer relative">
                    <input type="checkbox" checked={selectData.includes(category.id || "")} onChange={() => handleSelectData(category.id || "")} className="hidden peer" />
                    <span className="w-5 h-5 border border-zinc-500 bg-black rounded-none relative flex items-center justify-center peer-checked:border-[#00f0ff] peer-checked:bg-[#00f0ff]/10"></span>
                    <FaCheck size={12} className="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2 text-[#00f0ff]" />
                </label>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-start gap-4">
                    <div className="w-12 h-12 border border-zinc-800 bg-black flex items-center justify-center overflow-hidden p-1 relative">
                        <div className="absolute inset-0 bg-[#00f0ff]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <img
                            src={category.image || "/placeholder.png"}
                            alt={category.name}
                            className="w-full h-full object-cover grayscale mix-blend-screen opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                        />
                    </div>
                    <div className="text-left flex flex-col items-start">
                        <p className="text-white font-black uppercase tracking-widest text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{category.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-zinc-500">|</span>
                            <span className="text-[10px] text-[#00f0ff] font-bold uppercase tracking-widest">{category.slug}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-zinc-400 text-xs text-left max-w-xs truncate border-l border-zinc-900 mx-4">
                {category.description}
            </td>
            <td className="px-6 py-4 border-l border-zinc-900">
                <span className={`inline-flex items-center justify-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border transition-all ${category.isActive
                    ? "border-[#e4ff00]/30 bg-[#e4ff00]/5 text-[#e4ff00]"
                    : "border-[#ff0055]/30 bg-[#ff0055]/5 text-[#ff0055]"
                    }`}>
                    {category.isActive ? (
                        <>
                            <MdCheckCircle size={12} />
                            [ACTIVE]
                        </>
                    ) : (
                        <>
                            <MdBlock size={12} />
                            [INACTIVE]
                        </>
                    )}
                </span>
            </td>
            <td className="px-6 py-4 border-l border-zinc-900">
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => navigate(`/dashboard/categories/${category.id}/edit`)}
                        className="p-2 border border-zinc-800 text-zinc-500 hover:text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all bg-black"
                    >
                        <BiEdit size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(category)}
                        className="p-2 border border-zinc-800 text-zinc-500 hover:text-[#ff0055] hover:border-[#ff0055] hover:bg-[#ff0055]/10 transition-all bg-black"
                    >
                        <BsTrash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CategoryRow;