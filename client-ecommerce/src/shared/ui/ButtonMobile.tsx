import type { Dispatch, SetStateAction } from "react";
import { MdMenu } from "react-icons/md";

interface NavMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const ButtonMobile: React.FC<NavMobileProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="flex items-center justify-center bg-black border border-zinc-800 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all lg:hidden h-12 w-12 cursor-pointer relative group" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
      <MdMenu
        size={24}
        className="text-zinc-400 group-hover:text-[#00f0ff] transition-colors"
      />
    </div>
  );
};

export default ButtonMobile;
