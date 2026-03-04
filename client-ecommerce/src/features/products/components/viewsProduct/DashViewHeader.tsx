import { BsEye, BsTrash2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

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
                    <h1 className="text-2xl lg:text-4xl font-bold text-[#00f0ff] uppercase tracking-widest mb-2 flex items-center gap-3">
                        <BsEye className="text-[#00f0ff]" size={36} />
                        {data.name}
                    </h1>
                    <p className="text-zinc-500 font-bold tracking-[0.2em] text-[10px] mt-2 uppercase">SYS_ID: {data.id}</p>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-3 mt-4 lg:mt-0">
                <button
                    onClick={handleTogglePublish}
                    className={`flex items-center justify-center gap-2 px-4 py-2 transition-colors text-[10px] font-bold uppercase tracking-widest border ${data.isPublished
                        ? "bg-[#e4ff00]/10 border-[#e4ff00] text-[#e4ff00] hover:bg-[#e4ff00] hover:text-black"
                        : "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black"
                        }`}
                >
                    {data.isPublished ? <FiEyeOff size={16} /> : <BsEye size={16} />}
                    {data.isPublished ? "[UNPUBLISH]" : "[PUBLISH]"}
                </button>
                <button
                    onClick={() => navigate(`/dashboard/products/${data.id}/edit`)}
                    className="bg-transparent border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest"
                >
                    <BiEdit size={16} />
                    [EDIT]
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-transparent border border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055] hover:text-white transition-all flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest"
                >
                    <BsTrash2 size={16} />
                    [DELETE]
                </button>
            </div>
        </div>
    );
};

export default DashViewHeader;