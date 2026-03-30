import type { StatCard } from "../types/dashboard.types";
import { BiPackage, BiShoppingBag } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";

interface Props {
  totalOrders: number;
  pendingOrders: number;
  rewardPoints: number;
}

const Stats: React.FC<Props> = ({ totalOrders, pendingOrders, rewardPoints }) => {
  /* Borrar mas adelante cuando se obtenga los datos */
  const stats: StatCard[] = [
    {
      label: "[TOTAL_PEDIDOS]",
      value: totalOrders,
      icon: <BiShoppingBag size={24} />,
      color: "border-[#00f0ff] text-[#00f0ff]", // Accent configuration
    },
    {
      label: "[PEDIDOS_PENDIENTES]",
      value: pendingOrders,
      icon: <BiPackage size={24} />,
      color: "border-[#ff0055] text-[#ff0055]",
    },
    {
      label: "[TOTAL_INGRESOS]",
      value: `$${Math.trunc(rewardPoints)}`,
      icon: <CiDollar size={24} />,
      color: "border-[#e4ff00] text-[#e4ff00]",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 font-mono">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-[#050505] border border-zinc-800 p-6 relative group hover:border-zinc-600 transition-colors`}
        >
          {/* Subtle Accent Borders */}
          <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${stat.color.split(' ')[0]}`} />
          <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${stat.color.split(' ')[0]}`} />

          <div className="flex items-start justify-between">
            <div>
              <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-white font-mono tracking-wider">
                {stat.value}
              </h3>
            </div>
            <div
              className={`hidden lg:flex w-12 h-12 bg-black border border-zinc-800 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] ${stat.color} transition-colors group-hover:bg-zinc-900 group-hover:${stat.color.split(' ')[0]}`}
            >
              <span className={stat.color.split(' ')[1]}>
                {stat.icon}
              </span>
            </div>
          </div>

          {/* Decorative scanline on hover */}
          <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
        </div>
      ))}
    </div>
  );
};

export default Stats;
