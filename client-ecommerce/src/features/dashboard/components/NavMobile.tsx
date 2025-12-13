import React, { type Dispatch, type SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import { navLinksMobile } from "../const/menu.types";

interface NavMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const NavMobile: React.FC<NavMobileProps> = ({ isMenuOpen, setIsMenuOpen }) => {
    
  return (
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

      {navLinksMobile.map((item, i) => (
        <a key={i} href={item.link} onClick={() => setIsMenuOpen(false)}>
          {item.name}
        </a>
      ))}

      <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
        Cerrar Sesion
      </button>
    </div>
  );
};

export default NavMobile;
