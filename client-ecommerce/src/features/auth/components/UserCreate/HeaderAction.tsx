import type React from "react";
import { BiSave } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { CiEraser } from "react-icons/ci";

interface HeaderActionProps {
    isSubmitting: boolean;
    handleSubmit: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    handleReset?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
}
const HeaderAction: React.FC<HeaderActionProps> = ({ isSubmitting, handleSubmit, handleReset, title }) => {

    return (
        <div className="flex items-center justify-between my-5 lg:-mt-5">
            <div>
                <p className="text-slate-400">
                    Completa la información del {title}
                </p>
            </div>
            <div className="flex gap-3">
                <ButtonAction
                    onClick={handleReset}
                    text={"Resetear"}
                    variant="secondary"
                >
                    <CiEraser size={18} />
                </ButtonAction>
                <ButtonAction
                    onClick={handleSubmit}
                    text={"Guardar"}
                    variant="primary"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        </>
                    ) : (
                        <>
                            <BiSave size={18} />
                        </>
                    )}
                </ButtonAction>
            </div>
        </div>
    );
};

export default HeaderAction;