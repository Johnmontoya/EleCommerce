import { BiPlus } from "react-icons/bi";
import ButtonAction from "./ButtonAction";
import { useNavigate } from "react-router-dom";

interface DashHeaderProps {
    data: any[] | undefined;
    title: string;
    titleData: string;
    path: string;
    titleIcon: React.ReactNode;
    list?: boolean;
}

const DashHeader: React.FC<DashHeaderProps> = ({ data, title, titleData, path, titleIcon, list }) => {
    const navigate = useNavigate();


    return (
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b border-zinc-800 pb-6 mb-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-sm lg:text-2xl font-bold text-[#00f0ff] font-mono tracking-[0.2em] uppercase flex items-center gap-4">
                    <span className="text-[#00f0ff]/50"></span>
                    {titleIcon}
                    <span className="tracking-widest">{title}</span>
                </h1>
                {list && (
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-zinc-600 font-mono">--</span>
                        <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase bg-[#050505] border border-zinc-800 px-3 py-1 w-fit flex items-center gap-2">
                            TOTAL REGISTROS: <span className="text-[#e4ff00] font-bold">[{data?.length || 0}]</span>
                        </p>
                    </div>
                )}
            </div>
            {list && (
                <div className="flex-shrink-0">
                    <ButtonAction
                        text={`NUEVO ${titleData}`}
                        variant="primary"
                        onClick={() => navigate(`/dashboard/${path}/create`)}
                    >
                        <BiPlus size={18} />
                    </ButtonAction>
                </div>
            )}
        </div>
    );
};

export default DashHeader;