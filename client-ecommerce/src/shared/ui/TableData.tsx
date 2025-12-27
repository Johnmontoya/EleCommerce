import { FaCheck } from "react-icons/fa";

interface TableDataProps {
    theader: string[];
    children: React.ReactNode;
    selectedData: any[];
    Data: any[];
    handleSelectAll: () => void;
}

const TableData: React.FC<TableDataProps> = ({ theader, children, selectedData, Data, handleSelectAll }) => {
    return (
        <table className="w-full">
            <thead className="bg-slate-900/50">
                <tr>
                    <th className="px-6 py-4 text-left">
                        <label className="flex gap-3 items-center cursor-pointer relative">
                            <input
                                type="checkbox"
                                checked={selectedData.length === Data?.length}
                                onChange={handleSelectAll}
                                className="hidden peer"
                            />
                            <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-cyan-600"></span>
                            <FaCheck size={12} className="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2 text-cyan-600" />
                        </label>
                    </th>
                    {theader.map((header) => (
                        <th key={header} className="px-6 py-4 text-center text-slate-300 font-semibold text-sm">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
};

export default TableData;