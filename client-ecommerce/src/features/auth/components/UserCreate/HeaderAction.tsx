import type React from "react";
import { BiSave } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { CiEraser } from "react-icons/ci";

interface HeaderActionProps {
    isSubmitting: boolean;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    handleSubmit: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}
const HeaderAction: React.FC<HeaderActionProps> = ({ isSubmitting, setUserData, handleSubmit }) => {
    const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setUserData({});
    };

    return (
        <div className="flex items-center justify-between my-5 lg:-mt-5">
            <div>
                <p className="text-slate-400">
                    Completa la información del usuario
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