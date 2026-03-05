import React, { type Dispatch, type SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import { navLinksMobile, navLinksMobileAdmin } from "../const/menu.types";
import { useAuthStore } from "../../auth/store/useAuthStore";

interface NavMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const NavMobile: React.FC<NavMobileProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user } = useAuthStore();

  const menuToRender = user?.role === "ADMIN" ? [...navLinksMobile, ...navLinksMobileAdmin] : navLinksMobile;
  return (
    <div
      className={`pt-28 fixed top-0 left-0 w-full h-full overflow-y-auto bg-black/95 backdrop-blur-md border-r border-[#00f0ff]/30 text-base flex flex-col lg:hidden items-center justify-center gap-8 font-mono z-50 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50" />

      <div className="grid grid-cols-2 items-center gap-6 w-full px-8">
        {menuToRender.map((item, i) => (
          <a
            key={i}
            href={item.link}
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-xs text-center py-4 border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest hover:text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all"
          >
            [{item.name}]
          </a>
        ))}
      </div>

      <button className="bg-transparent border border-[#ff0055] text-[#ff0055] px-8 py-2 font-bold uppercase tracking-widest hover:bg-[#ff0055]/10 shadow-[0_0_10px_rgba(255,0,85,0.15)] transition-all">
        [TERMINATE_SESSION]
      </button>

      <button
        className="w-10 h-10 text-zinc-400 hover:text-[#ff0055] transition-colors p-2 border border-transparent hover:border-[#ff0055] hover:bg-[#ff0055]/10 rounded-none"
        onClick={() => setIsMenuOpen(false)}
      >
        <MdClose size={24} />
      </button>
    </div>
  );
};

export default NavMobile;
