import type React from "react";
import { BiSave } from "react-icons/bi";
import { CiEraser } from "react-icons/ci";

interface HeaderActionProps {
    isSubmitting: boolean;
    handleSubmit: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    handleReset?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
}
const HeaderAction: React.FC<HeaderActionProps> = ({ isSubmitting, handleSubmit, handleReset, title }) => {

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-zinc-800 mt-2">
            <div>
                <p className="text-[#00f0ff] font-mono uppercase tracking-widest text-[10px] font-bold">
                    [SYSTEM_PROMPT: COMPLETAR_{title?.toUpperCase()}_DATOS]
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleReset}
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-2 font-mono uppercase tracking-widest text-[10px] bg-transparent border border-zinc-700 text-zinc-400 hover:border-[#ff0055] hover:text-[#ff0055] transition-all"
                >
                    <CiEraser size={14} />
                    [RESETEAR_DATOS]
                </button>
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="flex items-center justify-center gap-2 px-6 py-2 font-mono uppercase tracking-widest text-[10px] font-bold bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-all"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin h-3 w-3 border-2 border-[#00f0ff] border-t-transparent rounded-none" />
                            [PROCESANDO...]
                        </>
                    ) : (
                        <>
                            <BiSave size={14} />
                            [EJECUTAR_GUARDADO]
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default HeaderAction;