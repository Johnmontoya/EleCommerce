import React, { useState } from "react";
import {
  BiCreditCard,
  BiEdit,
  BiHeart,
  BiMapPin,
  BiPackage,
  BiPhone,
  BiShoppingBag,
  BiUser,
} from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { CiDollar, CiLock } from "react-icons/ci";
import { MdClose, MdDashboard, MdEmail, MdMenu } from "react-icons/md";

interface Order {
  id: string;
  date: string;
  status: "In Transit" | "Delivered";
  total: number;
}

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const DashboardPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Pedidos", path: "/" },
    { name: "Rastrear envios", path: "/" },
    { name: "Liste de deseos", path: "/" },
    { name: "Perfil de usuario", path: "/" },
    { name: "Metodos de pago", path: "/" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const orders: Order[] = [
    {
      id: "#ORD-7352",
      date: "Oct 24, 2023",
      status: "In Transit",
      total: 765.0,
    },
    {
      id: "#ORD-7351",
      date: "Sep 12, 2023",
      status: "Delivered",
      total: 120.5,
    },
    {
      id: "#ORD-7290",
      date: "Aug 05, 2023",
      status: "Delivered",
      total: 640.0,
    },
  ];

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

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard size={20} /> },
    { name: "Order History", icon: <CiLock size={20} /> },
    { name: "Track Shipments", icon: <BsTruck size={20} /> },
    { name: "Wishlist", icon: <BiHeart size={20} />, badge: 8 },
    { name: "Profile Settings", icon: <BiUser size={20} /> },
    { name: "Payment Methods", icon: <BiCreditCard size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-screen bg-slate-900/50 border-r border-slate-700 p-6 shrink-0">
          {/* User Profile Card */}
          <div className="mb-8 pb-6 border-b border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
              <div>
                <h3 className="text-slate-100 font-semibold">Hola, John</h3>
                <p className="text-slate-500 text-xs">john.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  activeMenu === item.name
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium z-50 text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <MdClose size={24} />
          </button>

          {navLinks.map((link, i) => (
            <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}

          <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Cerrar Sesion
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden h-20">
            <MdMenu
              size={32}
              className="text-slate-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>

          {/* Stats Cards */}
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

          {/* Recent Orders */}
          <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-100">
                Recent Orders
              </h2>
              <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors">
                View All
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 font-semibold text-sm py-3 px-4">
                      ORDER ID
                    </th>
                    <th className="text-left text-slate-400 font-semibold text-sm py-3 px-4">
                      DATE
                    </th>
                    <th className="text-left text-slate-400 font-semibold text-sm py-3 px-4">
                      STATUS
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
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="py-4 px-4 text-slate-100 font-medium">
                        {order.id}
                      </td>
                      <td className="py-4 px-4 text-slate-400">{order.date}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "In Transit"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-100 font-semibold">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors">
                          {order.status === "In Transit"
                            ? "Track Order"
                            : "Details"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Profile and Shipping Address */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Profile */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-100">
                  Personal Profile
                </h2>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  <BiEdit size={16} />
                  Edit
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BiUser size={18} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-slate-500 text-sm">Full Name</p>
                    <p className="text-slate-100 font-medium">John Doe</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdEmail size={18} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-slate-500 text-sm">Email Address</p>
                    <p className="text-slate-100 font-medium">
                      john.doe@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BiPhone size={18} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-slate-500 text-sm">Phone</p>
                    <p className="text-slate-100 font-medium">
                      (04) 123 456 7890
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-100">
                  Shipping Address
                </h2>
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
                >
                  Change
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BiMapPin size={18} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-slate-100 font-semibold mb-2">
                      John Doe
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Carrera 13A #9-40
                      <br />
                      Bogotá, D.C.
                      <br />
                      Colombia
                    </p>
                  </div>
                </div>

                <button className="w-full mt-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 py-2 rounded-lg font-semibold text-sm transition-all">
                  Default Address
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
