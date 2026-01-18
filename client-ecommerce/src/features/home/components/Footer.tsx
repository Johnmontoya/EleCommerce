import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { CiShoppingBasket } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import ButtonAction from "../../../shared/ui/ButtonAction";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className={`py-12 px-8 bg-blue-600/40 dark:bg-slate-950/95`}>
      <div className="max-w-7xl mx-auto">
        {/* Contenido Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">

          {/* Columna 1: Logo y Descripción */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 cursor-pointer mb-2"
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

            {/* Descripción */}
            <p className={`text-sm mb-6 leading-relaxed text-gray-600`}>
              Tu tienda online de confianza para encontrar y vender productos increíbles.
            </p>

            {/* Redes Sociales */}
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaFacebook size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-pink-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaYoutube size={14} />
              </a>
            </div>

            {/* Información de Contacto */}
            <div className={`text-sm space-y-2 text-gray-600`}>
              <div className="flex items-center gap-2">
                <BiPhone size={16} />
                <span>+573228624863</span>
              </div>
              <div className="flex items-center gap-2">
                <BiEnvelope size={16} />
                <span>contacto@elecommerce.com</span>
              </div>
              <div className="flex items-center gap-2">
                <BiMap size={16} />
                <span>Cll, cale 14, Ciudad, País</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className={`text-base font-semibold mb-4 text-gray-800 dark:text-gray-200`}>
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {['Inicio', 'Sobre Nosotros', 'Tienda', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={`text-sm hover:text-cyan-600 transition-colors text-gray-600 dark:text-gray-500`}
                  >
                    • {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Mi Cuenta */}
          <div>
            <h3 className={`text-base font-semibold mb-4 text-gray-800 dark:text-gray-200`}>
              Mi Cuenta
            </h3>
            <ul className="space-y-2">
              {['Mi Perfil', 'Mis Pedidos', 'Mis Favoritos', 'Soporte'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={`text-sm hover:text-cyan-600 transition-colors text-gray-600 dark:text-gray-500`}
                  >
                    • {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Recursos */}
          <div>
            <h3 className={`text-base font-semibold mb-4 text-gray-800 dark:text-gray-200`}>
              Recursos
            </h3>
            <ul className="space-y-2">
              {['Blog', 'Ayuda', 'Términos y Condiciones', 'Política de Privacidad'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={`text-sm hover:text-cyan-600 transition-colors text-gray-600 dark:text-gray-500`}
                  >
                    • {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 5: Suscríbete */}
          <div>
            <h3 className={`text-base font-semibold mb-4 text-gray-800 dark:text-gray-200`}>
              Suscríbete
            </h3>
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className={`w-full px-3 py-3 rounded-md text-sm mb-3 outline-none border bg-white border-gray-300 text-gray-700`}
            />
            <ButtonAction variant="primary" text="" className="w-full flex justify-center" onClick={() => { }}>
              Suscribirse
            </ButtonAction>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`pt-6 border-t flex flex-wrap justify-between items-center gap-4 border-gray-300`}>
          {/* Copyright */}
          <p className={`text-sm text-gray-600`}>
            © 2024 ELECOMMERCE. Todos los derechos reservados.
          </p>

          {/* Métodos de Pago */}
          <div className="flex gap-3 items-center">
            {/* Visa */}
            <div className="bg-white px-2 py-1 rounded text-blue-900 font-bold text-base">
              VISA
            </div>

            {/* Mastercard */}
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-red-600"></div>
              <div className="w-6 h-6 rounded-full bg-yellow-500 -ml-3"></div>
            </div>

            {/* American Express */}
            <div className="bg-blue-600 px-2 py-1 rounded text-white font-bold text-xs leading-tight">
              AMERICAN<br />EXPRESS
            </div>

            {/* PayPal */}
            <div className="bg-blue-700 px-2.5 py-1.5 rounded text-white font-bold text-xs italic">
              PayPal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
