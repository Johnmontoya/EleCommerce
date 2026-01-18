import type { Dispatch, SetStateAction } from "react";
import { MdMenu } from "react-icons/md";

interface NavMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const ButtonMobile: React.FC<NavMobileProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="flex items-center gap-3 md:hidden h-20 ">
      <MdMenu
        size={32}
        className="text-slate-100 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
    </div>
  );
};

export default ButtonMobile;
