import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { CiShoppingBasket } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 px-8 bg-[#020202] border-t border-zinc-800 relative overflow-hidden font-mono z-10 w-full mt-auto">
      {/* Decorative Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Columna 1: Logo y Descripción */}
          <div className="lg:col-span-1 border border-zinc-800 bg-[#050505] p-6 relative">
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

            <Link
              to="/"
              className="flex items-center space-x-4 cursor-pointer mb-6 group"
              aria-label="Ir al inicio"
            >
              <div className="w-10 h-10 bg-black border border-[#00f0ff] flex items-center justify-center relative">
                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white" />
                <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white" />
                <span className="text-xl font-bold text-[#00f0ff] group-hover:scale-110 transition-transform">
                  <CiShoppingBasket size={24} />
                </span>
              </div>
              <span className="text-xl font-black uppercase tracking-[0.1em] text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                ELECOMMERCE
              </span>
            </Link>

            <p className="text-[10px] uppercase tracking-widest leading-relaxed text-zinc-500 mb-6 border-l border-zinc-700 pl-3">
              TU DEPÓSITO EN LÍNEA VERIFICADO PARA ADQUIRIR EQUIPOS Y MERCANCÍAS AVANZADAS.
            </p>

            <div className="flex gap-4 mb-8">
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-black border border-zinc-800 text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-colors group relative">
                <FaFacebook size={12} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-black border border-zinc-800 text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-colors group relative">
                <FaTwitter size={12} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-black border border-zinc-800 text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-colors group relative">
                <FaInstagram size={12} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-black border border-zinc-800 text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-colors group relative">
                <FaYoutube size={12} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="text-[10px] space-y-4 text-zinc-400 uppercase tracking-widest">
              <div className="flex items-center gap-3">
                <BiPhone size={14} className="text-[#00f0ff]" />
                <span>+57 322 862 4863</span>
              </div>
              <div className="flex items-center gap-3">
                <BiEnvelope size={14} className="text-[#00f0ff]" />
                <span>CONTACT@ELECOMMERCE.SYS</span>
              </div>
              <div className="flex items-center gap-3">
                <BiMap size={14} className="text-[#00f0ff]" />
                <span>SECTOR 14, CITY, REGION</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="pt-4 md:pl-4 border-t border-zinc-800 md:border-t-0 md:border-l">
            <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-6">
              ENLACES RÁPIDOS //
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-[10px] text-zinc-500 hover:text-[#00f0ff] uppercase tracking-widest transition-colors flex items-center group">
                  <span className="text-zinc-800 mr-2 group-hover:text-[#00f0ff] transition-colors">{">"}</span> INICIO
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[10px] text-zinc-500 hover:text-[#00f0ff] uppercase tracking-widest transition-colors flex items-center group">
                  <span className="text-zinc-800 mr-2 group-hover:text-[#00f0ff] transition-colors">{">"}</span> SOBRE EL PROTOCOLO
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-[10px] text-zinc-500 hover:text-[#00f0ff] uppercase tracking-widest transition-colors flex items-center group">
                  <span className="text-zinc-800 mr-2 group-hover:text-[#00f0ff] transition-colors">{">"}</span> TIENDA
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[10px] text-zinc-500 hover:text-[#00f0ff] uppercase tracking-widest transition-colors flex items-center group">
                  <span className="text-zinc-800 mr-2 group-hover:text-[#00f0ff] transition-colors">{">"}</span> COMMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Mi Cuenta */}
          <div className="pt-4 md:pl-4 border-t border-zinc-800 md:border-t-0 md:border-l">
            <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-6">
              MI CUENTA //
            </h3>
            <ul className="space-y-4">
              {['PERFIL_USUARIO', 'HISTORIAL_DE_PEDIDOS', 'ARTÍCULOS_GUARDADOS', 'SOPORTE_TÉCNICO'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[10px] text-zinc-500 hover:text-[#00f0ff] uppercase tracking-widest transition-colors flex items-center group"
                  >
                    <span className="text-zinc-800 mr-2 group-hover:text-[#00f0ff] transition-colors">{">"}</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Recursos */}
          <div className="pt-4 md:pl-4 border-t border-zinc-800 md:border-t-0 md:border-l">
            <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-6">
              RECURSOS //
            </h3>
            <ul className="space-y-4">
              {['BLOG_DEL_SISTEMA', 'CENTRO_DE_AYUDA', 'TÉRMINOS_DE_COMPROMISO', 'PROTOCOLO_DE_PRIVACIDAD'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[10px] text-zinc-500 hover:text-[#00f0ff] uppercase tracking-widest transition-colors flex items-center group"
                  >
                    <span className="text-zinc-800 mr-2 group-hover:text-[#00f0ff] transition-colors">{">"}</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 5: Suscríbete */}
          <div className="pt-4 md:pl-4 border-t border-zinc-800 md:border-t-0 md:border-l">
            <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-6">
              SISTEMA DE COMUNICACIÓN //
            </h3>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="ENTER_EMAIL_ADDRESS"
                className="w-full bg-black border border-zinc-800 p-3 text-xs text-white outline-none focus:border-[#00f0ff] transition-colors uppercase tracking-widest font-mono placeholder:text-zinc-700"
              />
              <button className="w-full border border-[#00f0ff] bg-black text-[#00f0ff] p-3 text-xs font-bold tracking-widest uppercase hover:bg-[#00f0ff] hover:text-black transition-all">
                SUSCRÍBETE A LA RED
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
            © 2024 ELECOMMERCE.SYS // ALL RIGHTS RESERVED.
          </p>

          {/* Métodos de Pago */}
          <div className="flex gap-4 items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Visa */}
            <div className="bg-[#050505] border border-zinc-800 px-3 py-1 flex items-center justify-center">
              <span className="text-white font-bold text-xs uppercase tracking-widest">VISA</span>
            </div>
            {/* Mastercard */}
            <div className="bg-[#050505] border border-zinc-800 px-3 py-1 flex items-center justify-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 -ml-2 mix-blend-screen" />
            </div>
            {/* Amex */}
            <div className="bg-[#050505] border border-zinc-800 px-3 py-1 flex items-center justify-center">
              <span className="text-white font-bold text-[10px] uppercase tracking-widest">AMEX</span>
            </div>
            {/* PayPal */}
            <div className="bg-[#050505] border border-zinc-800 px-3 py-1 flex items-center justify-center">
              <span className="text-white font-bold text-xs italic tracking-widest">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
