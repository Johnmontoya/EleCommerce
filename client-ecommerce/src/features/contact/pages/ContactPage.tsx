import { FaArrowRight, FaFacebook } from "react-icons/fa";
import { ImGoogle3 } from "react-icons/im";
import { MdEmail } from "react-icons/md";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 pb-6">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto flex justify-start items-center px-4 py-4">
        <p className="text-slate-300 font-light text-sm">
          <span className="hover:text-cyan-400 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-cyan-400 font-medium cursor-pointer">
            Contact
          </span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-6 my-8 mx-auto">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-slate-100">
              Contacto
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 text-slate-100 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
          <h2 className="text-lg font-semibold mb-1">Envíanos un mensaje</h2>
          <p className="text-sm text-white/60 mb-4">
            Llena el formulatio de abajo y nuestro equipo te respondera dentro de las proximas 24 horas.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Nombre Completo</label>
                <input
                  className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Correo Electrónico</label>
                <input
                  className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Teléfono</label>
                <input
                  className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Asunto</label>
                <select className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all">
                  <option>Soporte Técnico</option>
                  <option>Ventas</option>
                  <option>Información</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Mensaje</label>
              <textarea
                className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                placeholder="¿Cómo podemos ayudarte hoy?"
              />
            </div>

            <button className="flex flex-row gap-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-110 cursor-pointer">
              <p>Enviar Mensaje</p>
              <FaArrowRight size={20} />
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-linear-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold">Información de Contacto</h2>

          <div className="space-y-3 text-white/80 text-sm">
            <div>
              <p className="font-semibold">Dirección Principal</p>
              <p>
                Carrera 13A #9-40
                <br />
                Bogotá, Colombia
              </p>
            </div>

            <div>
              <p className="font-semibold">Correo Electrónico</p>
              <p className="text-[#00c6ff]">soporte@ecommerce.com</p>
              <p>Respuesta en 24h</p>
            </div>

            <div>
              <p className="font-semibold">Llámanos</p>
              <p>(+04) 123 456 7890</p>
              <p>Lun-Vie: 9am - 6pm</p>
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <div className="flex justify-center items-center w-8 h-8 bg-slate-600 rounded-full">
                <MdEmail size={20} />
            </div>
            <div className="flex justify-center items-center w-8 h-8 bg-slate-600 rounded-full">
                <ImGoogle3 size={20} />
            </div>
            <div className="flex justify-center items-center w-8 h-8 bg-slate-600 rounded-full">
                <FaFacebook size={20} />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl space-y-4">
          <h2 className="text-lg font-semibold">Preguntas Frecuentes</h2>

          <details className="bg-slate-900 p-3 rounded-md">
            <summary className="cursor-pointer font-medium">
              ¿Hacen envíos internacionales?
            </summary>
            <p className="mt-2 text-white/70 text-sm">
              Sí, enviamos a varios países.
            </p>
          </details>

          <details className="bg-slate-900 p-3 rounded-md">
            <summary className="cursor-pointer font-medium">
              ¿Cuál es el tiempo de respuesta?
            </summary>
            <p className="mt-2 text-white/70 text-sm">
              Nuestro tiempo promedio es 24h.
            </p>
          </details>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-7xl mx-auto mt-6 bg-[#0a1124] rounded-xl p-0 shadow-xl overflow-hidden">
        <div className="relative h-56 bg-linear-to-br from-green-300 to-blue-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-[#0f172a] border-4 border-white rounded-full"></div>
          <div className="absolute bottom-2 left-2 bg-[#0f172a] px-3 py-1 rounded-md text-sm">
            Ubicación
            <br />
            Carrera 13A #9-40, Ciudad
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
