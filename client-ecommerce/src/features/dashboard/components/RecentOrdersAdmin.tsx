import moment from "moment";
import type { OrderResponse } from "../../orders/types/order.types";

interface Props {
    data: OrderResponse[] | undefined;
}

const RecentOrdersAdmin: React.FC<Props> = ({ data }) => {

    return (
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Ordenes Recientes</h2>
                <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors">
                    Ver Todo
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="text-left text-slate-400 font-semibold text-sm py-3 px-4">
                                ID DE LA ORDEN
                            </th>
                            <th className="text-left text-slate-400 font-semibold text-sm py-3 px-4">
                                FECHA
                            </th>
                            <th className="text-left text-slate-400 font-semibold text-sm py-3 px-4">
                                ESTADO
                            </th>
                            <th className="text-left text-slate-400 font-semibold text-sm py-3 px-4">
                                TOTAL
                            </th>
                            <th className="text-left text-slate-400 font-semibold text-sm py-3 px-4">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((order) => (
                            <tr
                                key={order.id}
                                className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                            >
                                <td className="py-4 px-4 text-slate-100 font-medium uppercase">
                                    {order.trackingNumber}
                                </td>
                                <td className="py-4 px-4 text-slate-400">{moment(order.createdAt).format("DD/MM/YYYY")}</td>
                                <td className="py-4 px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "In Transit"
                                            ? "bg-blue-500/20 text-blue-400"
                                            : "bg-green-500/20 text-green-400"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-slate-100 font-semibold">
                                    ${order.total}
                                </td>
                                <td className="py-4 px-4">
                                    <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors">
                                        {order.status === "In Transit" ? "Track Order" : "Details"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrdersAdmin;
