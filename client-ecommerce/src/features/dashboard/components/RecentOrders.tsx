import moment from "moment";
import type { OrderResponse } from "../../orders/types/order.types";
import { BadgeStatus } from "../../../shared/ui/BadgeStatus";
import ButtonAction from "../../../shared/ui/ButtonAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalOrderDetails from "./ModalOrderDetails";

interface Props {
  data: OrderResponse[] | undefined;
}

const RecentOrders: React.FC<Props> = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderResponse | null>(null);

  const handleOpenModal = (index: string) => {
    const order = data?.find((order) => order.id === index);
    if (!order) {
      return;
    }
    setOrder(order)
    setOpenModal(true);
  };

  return (
    <>
      <ModalOrderDetails
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Orden"
        data={order}
      />
      <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-100">Ordenes Recientes</h2>
          <ButtonAction variant="edit" text="" onClick={() => navigate("/dashboard/orders")} className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors">
            Ver Todo
          </ButtonAction>
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
                    <BadgeStatus status={order.status} />
                  </td>
                  <td className="py-4 px-4 text-slate-100 font-semibold">
                    ${order.total}
                  </td>
                  <td className="py-4 px-4">
                    <button onClick={() => handleOpenModal(order.id)} className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors">
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecentOrders;
