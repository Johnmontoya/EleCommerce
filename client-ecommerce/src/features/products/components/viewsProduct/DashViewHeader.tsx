import { BsEye, BsTrash2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";

interface DashViewHeaderProps {
    data: any;
    handleTogglePublish?: () => void;
    handleDelete: () => void;
}

const DashViewHeader: React.FC<DashViewHeaderProps> = ({ data, handleTogglePublish, handleDelete }) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
                        <BsEye className="text-cyan-400" size={36} />
                        {data.name}
                    </h1>
                    <p className="text-slate-400 mt-1">ID: {data.id}</p>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-3">
                <ButtonAction
                    variant="view"
                    text=""
                    onClick={handleTogglePublish}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${data.isPublished
                        ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        }`}
                >
                    {data.isPublished ? <FiEyeOff size={18} /> : <BsEye size={18} />}
                    {data.isPublished ? "Despublicar" : "Publicar"}
                </ButtonAction>
                <ButtonAction
                    onClick={() => navigate(`/dashboard/products/${data.id}/edit`)}
                    variant="edit"
                    text="Editar"
                >
                    <BiEdit size={18} />
                </ButtonAction>
                <ButtonAction
                    onClick={handleDelete}
                    variant="delete"
                    text="Eliminar"
                >
                    <BsTrash2 size={18} />
                </ButtonAction>
            </div>
        </div>
    );
};

export default DashViewHeader;