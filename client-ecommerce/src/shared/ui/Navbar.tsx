import { BiHeart, BiSearch } from "react-icons/bi";
import {
  CiLocationOn,
  CiLogin,
  CiShoppingBasket,
  CiShoppingCart,
} from "react-icons/ci";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../../features/home/components/Footer";
import { MdDashboard } from "react-icons/md";
import { SearchModal } from "../../features/search/components/SearchModal";
import { useAuthStore } from "../../features/auth/store/useAuthStore";
import { BsTruck } from "react-icons/bs";
import { useCartCount } from "../../features/auth/hooks/queries/useUsers";
import { useWishCount } from "../../features/wishlist/hook/queries/useWishList";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { data: cartCount } = useCartCount(user?.id ?? "");
  const { data: wishCount } = useWishCount(user?.id ?? "");

  let street = "";
  if (user?.addresses) {
    street = user?.addresses[0]?.state + ", " + user?.addresses[0]?.street;
  }

  return (
    <>
      <header className={`bg-[#050505] border-b border-zinc-800 shadow-sm sticky top-0 z-50 font-mono`}>
        {/* Navigation */}
        <nav className="border-b border-zinc-800 bg-black">
          <div className="flex justify-between font-bold tracking-widest text-[#00f0ff] uppercase text-[10px] items-center max-w-7xl mx-auto py-1 px-4">
            {user && (
              <div className="flex flex-row gap-4">
                <div className="flex items-center">
                  <p>COMM-LINK: {user?.phone}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <CiLocationOn size={16} />
                  <div>
                    <span className="text-zinc-500">OBJETIVO:</span> {user?.firstName} // {street ? street : "COORD_DESCONOCIDA"}
                  </div>
                </div>
              </div>
            )}
            <div className="hidden md:flex">
              <p className="text-[#e4ff00]">SYS_MSG: BONO DE INVITACIÓN ACTIVO // 20% DE DESCUENTO</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="text-zinc-500 border-r border-zinc-800 pr-4">UTC // COP</div>
              {user ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 text-[#00f0ff] hover:text-white transition-colors"
                  type="button"
                >
                  <MdDashboard size={14} />
                  <span>DASHBOARD</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 text-[#00f0ff] hover:text-white transition-colors"
                  type="button"
                >
                  <CiLogin size={14} />
                  <span>SYS_LOGIN</span>
                </button>
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
        <div className="max-w-7xl mx-auto px-4 py-3 relative">
          {/* Tech Accents Left/Right */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00f0ff]" />
          <div className="absolute top-0 right-0 w-1 h-full bg-[#e4ff00]" />

          <div className="flex items-center justify-between">
            <div className="w-full flex justify-between items-center md:space-x-8 space-x-0">
              <Link
                to="/"
                className="flex items-center space-x-4 cursor-pointer group"
                aria-label="Ir al inicio"
              >
                <div className="w-10 h-10 bg-black border border-[#00f0ff] flex items-center justify-center relative">
                  {/* Logo Target */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
                  <span className="text-xl font-bold text-[#00f0ff] group-hover:scale-110 transition-transform">
                    <CiShoppingBasket size={24} title="EleCommerce Logo" />
                  </span>
                </div>
                {/* SEO-friendly H1 for logo - only visible to search engines/screen readers or as styled text */}
                <h1 className="hidden md:block text-2xl font-black uppercase tracking-[0.2em] text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  ELECOMMERCE
                </h1>
              </Link>
              <nav className="w-full flex justify-center items-center text-zinc-400 font-bold px-10" style={{ fontFamily: "'Rajdhani', sans-serif" }} aria-label="Navegación principal">
                <div className="relative hidden lg:block">
                  <ul className="flex flex-row gap-8 text-sm tracking-widest">
                    <li className="hover:text-[#00f0ff] transition-colors uppercase border-b-2 border-transparent hover:border-[#00f0ff]">
                      <Link to="/">HOME</Link>
                    </li>
                    <li className="hover:text-[#00f0ff] transition-colors uppercase border-b-2 border-transparent hover:border-[#00f0ff]">
                      <Link to="/products">PRODUCTOS</Link>
                    </li>
                    <li className="hover:text-[#00f0ff] transition-colors uppercase border-b-2 border-transparent hover:border-[#00f0ff]">
                      <Link to="/blog">BLOG</Link>
                    </li>
                    <li className="hover:text-[#00f0ff] transition-colors uppercase border-b-2 border-transparent hover:border-[#00f0ff]">
                      <Link to="/faq">AYUDA</Link>
                    </li>
                    <li className="hover:text-[#00f0ff] transition-colors uppercase border-b-2 border-transparent hover:border-[#00f0ff]">
                      <Link to="/contact">CONTACTO</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            <div className="flex flex-row items-center gap-4">
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 border border-zinc-800 hover:border-[#00f0ff] hover:text-[#00f0ff] text-zinc-400 transition-colors bg-black"
                type="button"
                aria-label="Abrir búsqueda"
              >
                <BiSearch size={20} />
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="p-2 border border-zinc-800 hover:border-[#ff0055] hover:text-[#ff0055] text-zinc-400 transition-colors bg-black relative"
                type="button"
                aria-label="Ver lista de deseos"
              >
                <BiHeart size={20} />
                {(wishCount?.count ?? 0) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff0055] text-white text-[10px] font-bold px-1.5 py-0.5 border border-black z-10">
                    {wishCount?.count || 0}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="p-2 border border-zinc-800 hover:border-[#e4ff00] hover:text-[#e4ff00] text-zinc-400 transition-colors bg-black relative"
                type="button"
                aria-label="Ver carrito"
              >
                <CiShoppingCart size={20} />
                {(cartCount?.count ?? 0) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#e4ff00] text-black text-[10px] font-bold px-1.5 py-0.5 border border-black z-10">
                    {cartCount?.count || 0}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate("/tracking")}
                className="p-2 border border-zinc-800 hover:border-[#00f0ff] hover:text-[#00f0ff] text-zinc-400 transition-colors bg-black"
                type="button"
                aria-label="Seguimiento de pedido"
              >
                <BsTruck size={20} />
              </button>
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
