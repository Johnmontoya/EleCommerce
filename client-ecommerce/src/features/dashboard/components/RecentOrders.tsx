import moment from "moment";
import type { OrderResponse } from "../../orders/types/order.types";
import { BadgeStatus } from "../../../shared/ui/BadgeStatus";
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
        title="[DETALLES_DEL_PEDIDO]"
        data={order}
      />
      <div className="bg-[#050505] border border-zinc-800 p-6 relative mb-8 font-mono">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-widest">
              [TRANSACCIONES_RECENTES]
            </h2>
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase mt-1">
              LOG_DEL_SISTEMA: ÚLTIMOS PEDIDOS PROCESADOS.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/orders")}
            className="text-[#00f0ff] hover:text-white hover:bg-[#00f0ff]/10 border border-transparent hover:border-[#00f0ff] px-4 py-2 text-xs font-bold transition-all uppercase tracking-widest"
          >
            [VER_TODO]
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-zinc-800">
                <th className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest py-3 px-4">
                  [ID_DEL_PEDIDO]
                </th>
                <th className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest py-3 px-4">
                  [FECHA]
                </th>
                <th className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest py-3 px-4">
                  [ESTADO]
                </th>
                <th className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest py-3 px-4">
                  [VALOR_TOTAL]
                </th>
                <th className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest py-3 px-4 text-right">
                  [ACCIÓN]
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors group"
                >
                  <td className="py-4 px-4 text-white text-xs font-bold uppercase tracking-wider">
                    <span className="text-zinc-600 mr-2">{'>'}</span>
                    {order.trackingNumber}
                  </td>
                  <td className="py-4 px-4 text-zinc-400 text-xs tracking-wider">
                    {moment(order.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-4 px-4">
                    <BadgeStatus status={order.status} />
                  </td>
                  <td className="py-4 px-4 text-[#e4ff00] font-bold text-sm tracking-widest">
                    ${order.total}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleOpenModal(order.id)}
                      className="text-zinc-500 group-hover:text-[#00f0ff] text-xs font-bold tracking-widest uppercase transition-colors"
                    >
                      [DETALLES]
                    </button>
                  </td>
                </tr>
              ))}
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
                    NO SE ENCONTRARON TRANSACCIONES
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecentOrders;
