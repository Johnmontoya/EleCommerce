import type { StatCard } from "../types/dashboard.types";
import { BiPackage, BiShoppingBag } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";

const Stats = () => {
  /* Borrar mas adelante cuando se obtenga los datos */
  const stats: StatCard[] = [
    {
      label: "Total Orders",
      value: 24,
      icon: <BiShoppingBag size={24} />,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Pending Delivery",
      value: 2,
      icon: <BiPackage size={24} />,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Reward Points",
      value: "1,250",
      icon: <CiDollar size={24} />,
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-500/50 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-100">
                {stat.value}
              </h3>
            </div>
            <div
              className={`w-14 h-14 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
