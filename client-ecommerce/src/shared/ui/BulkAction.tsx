import type React from "react";
import { BiTrash } from "react-icons/bi";

interface BulkActionProps {
    selectedData: any[];
    title: string;
    handleBulkDelete: () => void;
}

const BulkAction: React.FC<BulkActionProps> = ({ selectedData, title, handleBulkDelete }) => {
    return (
        <div className="my-6 bg-black border border-zinc-800 p-4 flex items-center justify-between font-mono relative">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff0055] opacity-50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff0055] opacity-50" />
            <p className="text-[#ff0055] font-bold text-[10px] uppercase tracking-widest">
                [SYSTEM_NOTICE]: <span className="text-white">{selectedData.length}</span> {title}(S) SELECTED
            </p>
            <button
                onClick={handleBulkDelete}
                className="bg-[#ff0055]/10 border border-[#ff0055] hover:bg-[#ff0055]/20 text-[#ff0055] px-4 py-2 rounded-none font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
            >
                <BiTrash size={16} />
                [PURGE_SELECTION]
            </button>
        </div>
    );
};

export default BulkAction;