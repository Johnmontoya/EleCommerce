import type React from "react";
import { BiTrash } from "react-icons/bi";

interface BulkActionProps {
    selectedData: any[];
    title: string;
    handleBulkDelete: () => void;
}

const BulkAction: React.FC<BulkActionProps> = ({ selectedData, title, handleBulkDelete }) => {
    return (
        <div className="my-4 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-xl p-4 flex items-center justify-between">
            <p className="text-slate-100 font-semibold">
                {selectedData.length} {title}(s) seleccionado(s)
            </p>
            <button
                onClick={handleBulkDelete}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
                <BiTrash size={18} />
                Eliminar seleccionados
            </button>
        </div>
    );
};

export default BulkAction;