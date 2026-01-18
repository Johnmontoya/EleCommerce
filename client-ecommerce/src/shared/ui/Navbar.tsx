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
import { MdDashboard } from "react-icons/md";
import ButtonAction from "./ButtonAction";
import { SearchModal } from "../../features/search/components/SearchModal";
import { useAuthStore } from "../../features/auth/store/useAuthStore";
import { BsTruck } from "react-icons/bs";
import { useCartCount } from "../../features/auth/hooks/queries/useUsers";
import { useWishCount } from "../../features/wishlist/hook/queries/useWishList";
import { useTheme } from "./ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { data: cartCount } = useCartCount(user?.id!);
  const { data: wishCount } = useWishCount(user?.id!)
  const street = user?.addresses![0].state + ", " + user?.addresses![0].street;

  const toggle = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <>
      <header className={`navbar-light dark:navbar-dark shadow-sm sticky top-0 z-50`}>
        {/* Navigation */}
        <nav className="navbar topbar-light dark:topbar-dark">
          <div className="flex justify-between font-light items-center max-w-7xl mx-auto py-2 px-4 text-slate-100">
            {user && (
              <div className="flex flex-row gap-2">
                <div className="flex items-center text-sm">
                  <p>{user?.phone}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <CiLocationOn size={28} />
                  <div className="text-xs">
                    <p>Enviar a {user?.firstName}</p>
                    <span>{street}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="hidden md:flex text-sm">
              <p>Cuentale a un amigo sobre nuestra tienda y obtén 20% de descuento</p>
            </div>
            <div className="flex flex-row text-sm gap-4 items-center">
              <div>USD</div>
              <button
                onClick={toggle}
                className="p-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                aria-label="Cambiar tema"
              >
                {resolvedTheme === 'dark' ? '☀️ Modo claro' : '🌙 Modo oscuro'}
              </button>
              {user ? (
                <ButtonAction
                  onClick={() => navigate("/dashboard")}
                  text="Dashboard"
                  variant="primary"
                  className="py-2"
                  type="button"
                >
                  <MdDashboard size={18} />
                </ButtonAction>
              ) : (
                <ButtonAction
                  onClick={() => navigate("/login")}
                  text="Login"
                  variant="primary"
                  className="py-2"
                  type="button"
                >
                  <CiLogin size={18} />
                </ButtonAction>
              )}
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
            <div className="w-full flex justify-between items-center md:space-x-8 space-x-0">
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
                    <li className="hover:text-cyan-400 transition-all">
                      <Link to="/">HOME</Link>
                    </li>
                    <li className="hover:text-cyan-400 transition-all">
                      <Link to="/products">PRODUCTOS</Link>
                    </li>
                    <li className="hover:text-cyan-400 transition-all">
                      <Link to="/blog">BLOG</Link>
                    </li>
                    <li className="hover:text-cyan-400 transition-all">
                      <Link to="/faq">AYUDAS</Link>
                    </li>
                    <li className="hover:text-cyan-400 transition-all">
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

                {wishCount?.count! > 0 && (
                  <span className="absolute top-1 right-4 bg-cyan-500 shadow-lg shadow-cyan-500/90 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishCount?.count || 0}
                  </span>
                )}
              </ButtonAction>
              <ButtonAction
                className="relative"
                onClick={() => navigate("/cart")}
                variant="outline"
                text=""
                type="button"
              >
                <CiShoppingCart size={24} />

                {cartCount?.count! > 0 && (
                  <span className="absolute top-1 right-4 bg-cyan-500 shadow-lg shadow-cyan-500/90 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount?.count || 0}
                  </span>
                )}

              </ButtonAction>
              <ButtonAction
                className="relative"
                onClick={() => navigate("/tracking")}
                variant="outline"
                text=""
                type="button"
              >
                <BsTruck size={24} />
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
