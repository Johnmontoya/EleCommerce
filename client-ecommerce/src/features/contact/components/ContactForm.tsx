import { FaArrowRight } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div className="lg:col-span-2 bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
      <h2 className="text-lg font-semibold mb-1">Envíanos un mensaje</h2>
      <p className="text-sm text-white/60 mb-4">
        Llena el formulatio de abajo y nuestro equipo te respondera dentro de
        las proximas 24 horas.
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
  );
};

export default ContactForm;
