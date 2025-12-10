import { BiHeart, BiSearch } from "react-icons/bi";
import { CiLocationOn, CiShoppingBasket, CiShoppingCart } from "react-icons/ci";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../Home/Footer";
import { useState } from "react";
import { MdClose, MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <button
                onClick={() => navigate("/login")}
                className="w-30 bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-30 bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                Dashboard
              </button>
            </div>
          </div>
        </nav>

        {/* Buscador Modal */}
        <div
          className={`fixed z-50 inset-0 bg-gray-900/50 bg-opacity-60 overflow-y-auto h-full w-full px-4 ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <div className="w-full h-44 relative top-40 mx-auto shadow-xl rounded-md bg-linear-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 backdrop-blur-sm max-w-md">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <MdClose size={24} onClick={() => setIsMenuOpen(false)} />
              </button>
            </div>

            <div className="p-4">
              <h1 className="text-slate-100 font-bold px-4 py-2">Busca el producto que deseas</h1>
              <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full">
               <BiSearch size={24}/>               
              <input
                type="text"
                className="w-full h-full outline-none text-sm text-gray-500"
              />
              <button
                type="submit"
                className="bg-cyan-500 w-32 h-9 rounded-full text-sm text-white mr-[5px]"
              >
                Search
              </button>
            </div>
            </div>
          </div>
        </div>

        {/*Menu */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="w-full flex justify-between items-center space-x-8">
              <div
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition duration-500">
                  <span className="text-xl font-bold text-slate-100">
                    <CiShoppingBasket size={32} />
                  </span>
                </div>
                <h2 className="text-2xl font-bold uppercase bg-clip-text text-transparent bg-cyan-400">
                  EleCommerce
                </h2>
              </div>
              <div className="w-full flex justify-center items-center text-slate-100 font-light px-10">
                <div className="relative hidden lg:block">
                  <ul className="flex flex-row gap-4">
                    <li>
                      <Link to={"/"}>HOME</Link>
                    </li>
                    <li>
                      <Link to={"/products"}>CATEGORIAS</Link>
                    </li>
                    <li>
                      <Link to={"/blog"}>BLOG</Link>
                    </li>
                    <li>
                      <Link to={"/faq"}>AYUDAS</Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>CONTACTO</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative transition-all duration-300 hover:scale-120 cursor-pointer"
              >
                <BiSearch className="w-6 h-6 text-gray-200" />
              </button>
              <button className="relative transition-all duration-300 hover:scale-120 cursor-pointer">
                <BiHeart onClick={() => navigate('/wishlist')} className="w-6 h-6 text-gray-200" />
                <span className="absolute -top-2 -right-2 bg-cyan-500 shadow-lg shadow-cyan-500/90 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="relative transition-all duration-300 hover:scale-120 cursor-pointer">
                <CiShoppingCart onClick={() => navigate('/cart')} className="w-6 h-6 text-gray-200" />
                <span className="absolute -top-2 -right-2 bg-cyan-500 shadow-lg shadow-cyan-500/90 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
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
