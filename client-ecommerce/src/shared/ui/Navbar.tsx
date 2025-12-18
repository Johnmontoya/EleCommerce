import { BiHeart, BiSearch } from "react-icons/bi";
import {
  CiLocationOn,
  CiLogin,
  CiShoppingBasket,
  CiShoppingCart,
} from "react-icons/ci";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../features/home/components/Footer";
import { useState } from "react";
import { MdDashboard, MdOutlineLightMode } from "react-icons/md";
import ButtonAction from "./ButtonAction";
import { SearchModal } from "../../features/search/components/SearchModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <>
      <header className="bg-slate-900 shadow-sm sticky top-0 z-50">
        {/* Navigation */}
        <nav className="navbar bg-slate-800">
          <div className="flex justify-between font-light items-center max-w-7xl mx-auto py-2 px-4 text-slate-100">
            <div className="flex flex-row gap-2">
              <div className="flex items-center text-sm">
                <p>(04)1234567890</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <CiLocationOn size={28} />
                <div className="text-xs">
                  <p>Enviar a John</p>
                  <span>Carrera 13A #9-40</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex text-sm">
              <p>Tell a friend about our and get 20% off</p>
            </div>
            <div className="flex flex-row text-sm gap-4 items-center">
              <div>USD</div>
              <button className="cursor-pointer">
                <MdOutlineLightMode size={24} />
              </button>
              <ButtonAction
                onClick={() => navigate("/login")}
                text="Login"
                variant="primary"
                className="py-2"
                type="button"
              >
                <CiLogin size={18} />
              </ButtonAction>
              <ButtonAction
                onClick={() => navigate("/dashboard")}
                text="Dashboard"
                variant="primary"
                className="py-2"
                type="button"
              >
                <MdDashboard size={18} />
              </ButtonAction>
            </div>
          </div>
        </nav>

        {/* Search Modal Component */}
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
        />

        {/* Menu */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="w-full flex justify-between items-center space-x-8">
              <div
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition duration-500">
                  <span className="text-xl font-bold text-slate-100">
                    <CiShoppingBasket size={32} />
                  </span>
                </div>
                <h2 className="text-2xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                  EleCommerce
                </h2>
              </div>
              <div className="w-full flex justify-center items-center text-slate-100 font-light px-10">
                <div className="relative hidden lg:block">
                  <ul className="flex flex-row gap-4">
                    <li>
                      <Link to="/">HOME</Link>
                    </li>
                    <li>
                      <Link to="/products">CATEGORIAS</Link>
                    </li>
                    <li>
                      <Link to="/blog">BLOG</Link>
                    </li>
                    <li>
                      <Link to="/faq">AYUDAS</Link>
                    </li>
                    <li>
                      <Link to="/contact">CONTACTO</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center -space-x-6">
              <ButtonAction
                text=""
                onClick={() => setIsSearchModalOpen(true)}
                className="relative transition-all duration-300 hover:scale-120 cursor-pointer"
                variant="outline"
                type="button"
              >
                <BiSearch className="w-6 h-6 text-gray-200" />
              </ButtonAction>
              <ButtonAction
                className="relative"
                onClick={() => navigate("/wishlist")}
                variant="outline"
                text=""
                type="button"
              >
                <BiHeart size={24} />
                <span className="absolute top-1 right-4 bg-cyan-500 shadow-lg shadow-cyan-500/90 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </ButtonAction>
              <ButtonAction
                className="relative"
                onClick={() => navigate("/cart")}
                variant="outline"
                text=""
                type="button"
              >
                <CiShoppingCart size={24} />
                <span className="absolute top-1 right-4 bg-cyan-500 shadow-lg shadow-cyan-500/90 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </ButtonAction>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Navbar;
