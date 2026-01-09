import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation } from "../../hook/mutation/useCategoryMutation";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { BiEdit } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdBlock, MdCheckCircle } from "react-icons/md";
import SweetAlertas from "../../../../shared/ui/SweetAlertas";

interface CategoryRowProps {
    category: any;
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

    const handleDelete = (categoria: any) => {
        SweetAlertas.OnDialogChoose({
            message: `Estas seguro de eliminar la categoria ${categoria.name}`,
            onConfirm: () => ConfirmDeleteBlog(categoria.id),
            onCancel: Cancel,
        });
    };

    return (
        <tr
            key={category?.id}
            className="text-center border-t border-slate-700 hover:bg-slate-700/30 transition-colors"
        >
            <td className="px-6 py-4">
                <label className="flex gap-3 items-center cursor-pointer relative">
                    <input type="checkbox" checked={selectData.includes(category?.id!)} onChange={() => handleSelectData(category?.id!)} className="hidden peer" />
                    <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-cyan-600"></span>
                    <FaCheck size={12} className="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2 text-cyan-600" />
                </label>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-start gap-3">
                    <img
                        src={category.image || "/placeholder.png"}
                        alt={category.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-600"
                    />
                    <div className="text-left">
                        <p className="text-slate-100 font-semibold">{category.name}</p>
                        <p className="text-slate-400 text-xs">{category.slug}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-slate-300">{category.description}</td>
            <td className="px-6 py-4">
                <span className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${category.isActive
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    }`}>
                    {category.isActive ? (
                        <>
                            <MdCheckCircle size={14} />
                            Activo
                        </>
                    ) : (
                        <>
                            <MdBlock size={14} />
                            Inactivo
                        </>
                    )}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                    <ButtonAction
                        variant="edit"
                        onClick={() => navigate(`/dashboard/categories/${category.id}/edit`)}
                        text=""
                    >
                        <BiEdit size={18} />
                    </ButtonAction>
                    <ButtonAction
                        variant="delete"
                        onClick={() => handleDelete(category)}
                        text=""
                    >
                        <BsTrash2 size={18} />
                    </ButtonAction>
                </div>
            </td>
        </tr>
    );
};

export default CategoryRow;