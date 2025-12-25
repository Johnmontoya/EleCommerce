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
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl lg:text-4xl font-bold text-slate-100 mb-3 flex items-center gap-3">
                    {titleIcon}
                    {title}
                </h1>
                {list && <p className="text-slate-400">
                    {data?.length || 0} {titleData}(s) en total
                </p>}
            </div>
            {list && (
                <ButtonAction
                    text={`Nuevo ${titleData}`}
                    variant="primary"
                    onClick={() => navigate(`/dashboard/${path}/create`)}
                    className="mt-7"
                >
                    <BiPlus size={20} />
                </ButtonAction>
            )}
        </div>
    );
};

export default DashHeader;