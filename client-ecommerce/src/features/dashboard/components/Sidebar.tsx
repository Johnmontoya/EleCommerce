import { useState } from "react";
import { menuAdmin, menuItems } from "../const/menu.types";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");
  
  return (
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
          <Link
            key={item.name}
            to={item.link}
            onClick={() => setActiveMenu(item.name)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
              activeMenu === item.name
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {<item.icon size={20}/>}
              <span className="font-medium">{item.name}</span>
            </div>
            {item.badge && (
              <span className="bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
        {menuAdmin.map((item) => (
          <Link
          key={item.name}
          to={item.link}
            onClick={() => setActiveMenu(item.name)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
              activeMenu === item.name
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {<item.icon size={20}/>}
              <span className="font-medium">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
