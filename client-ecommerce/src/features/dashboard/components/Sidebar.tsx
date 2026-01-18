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
    <aside className="hidden md:flex flex-col w-64 min-h-screen p-6 shrink-0">
      {/* User Profile Card */}
      <div className="mb-8 pb-6 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {user?.username?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-slate-100 font-semibold">Hola, {user?.username}</h3>
            <p className="text-slate-300 text-xs">{user?.email}</p>
          </div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer hover:transform hover:rotate-90 transition-all"
          >
            <CiSettings size={20} className={`text-slate-100`} />
          </button>
        </div>
        <div className="flex flex-col w-full text-sm relative">
          {isOpen && (
            <ul className="w-full rounded shadow-md mt-1 py-2">
              {options.map((option, index) => (
                <li key={index} className="flex flex-row gap-2 text-slate-100 px-4 py-2 hover:bg-sidebar-link hover:text-white cursor-pointer" onClick={() => {
                  option.name.onClick();
                  setIsOpen(false);
                }} >
                  <option.name.icon size={20} />
                  {option.name.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuToRender.map((item) => {
          // 2. Lógica de activación inteligente
          // Esto marca el menú si la URL empieza por el link (útil para sub-rutas)
          const isActive = location.pathname === item.link ||
            (item.link !== '/dashboard' && location.pathname.startsWith(item.link));

          return (
            <Link
              key={item.name}
              to={item.link}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${isActive
                ? "bg-sidebar-link text-slate-100 border border-sidebar-link-border"
                : "text-slate-300 hover:text-slate-200 hover:bg-dash-search"
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-cyan-50/10 text-cyan-400 text-xs font-bold px-2 py-1 rounded-full border border-cyan-500/20">
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
