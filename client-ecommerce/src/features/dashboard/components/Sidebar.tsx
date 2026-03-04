import { useState } from "react";
import { menuAdmin, menuItems } from "../const/menu.types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/useAuthStore";
import { CiLogout, CiSettings, CiUser } from "react-icons/ci";
import { useQueryClient } from "@tanstack/react-query";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const options = [{
    name: {
      title: "Perfil",
      path: "/dashboard/profile",
      icon: CiUser,
      onClick: () => handleSelect("/dashboard/profile")
    },
  }, {
    name: {
      title: "Cerrar Sesión",
      path: "",
      icon: CiLogout,
      onClick: () => {
        logout();
        queryClient.clear();
        navigate('/login', { replace: true });
      }
    }
  }]

  const handleSelect = (option: string) => {
    setIsOpen(false);
    navigate(option);
  };

  const menuToRender = user?.role === 'ADMIN'
    ? [...menuItems, ...menuAdmin]
    : menuItems;

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[#050505] border-r border-zinc-800 p-6 shrink-0 font-mono relative">
      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

      {/* User Profile Card */}
      <div className="mb-8 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 border border-[#00f0ff] bg-black flex items-center justify-center text-white font-black text-lg shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            {user?.username?.slice(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-[#00f0ff] font-bold tracking-widest uppercase text-xs truncate">
              ID: {user?.username}
            </h3>
            <p className="text-zinc-500 text-[10px] tracking-wider truncate">
              {user?.email}
            </p>
          </div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer hover:text-[#e4ff00] transition-colors ml-auto"
          >
            <CiSettings size={20} className={`text-zinc-400`} />
          </button>
        </div>

        <div className="flex flex-col w-full text-sm relative z-50">
          {isOpen && (
            <ul className="w-full bg-black border border-zinc-800 mt-2 py-2 absolute top-0 left-0">
              {options.map((option, index) => (
                <li key={index} className="flex flex-row items-center gap-3 text-zinc-400 px-4 py-3 hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] hover:border-l-2 hover:border-[#00f0ff] cursor-pointer transition-colors text-xs uppercase tracking-widest font-bold font-mono" onClick={() => {
                  option.name.onClick();
                  setIsOpen(false);
                }} >
                  <option.name.icon size={16} />
                  {option.name.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1">
        {menuToRender.map((item) => {
          // Lógica de activación inteligente
          const isActive = location.pathname === item.link ||
            (item.link !== '/dashboard' && location.pathname.startsWith(item.link));

          return (
            <Link
              key={item.name}
              to={item.link}
              className={`w-full flex items-center justify-between px-4 py-3 transition-all border-l-2 text-xs uppercase tracking-widest font-bold ${isActive
                ? "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]"
                : "text-zinc-500 border-transparent hover:text-white hover:bg-zinc-900/50 hover:border-zinc-700"
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} className={isActive ? "text-[#00f0ff]" : ""} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-[#e4ff00]/10 text-[#e4ff00] text-[10px] font-black px-2 py-0.5 border border-[#e4ff00]/20 square">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
