import BreadCrumbs from "../../../shared/ui/BreadCrumbs";
import FaqQuestion from "../components/FaqQuestion";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Breadcrumb */}
      <BreadCrumbs />

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-4 mx-auto">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-slate-100">
              Centro de Ayuda
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 pb-8">
        <p className="text-[#94a3b8] mb-6">
          ¿Tienes alguna duda? Encuentra la respuesta aquí.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Buscar una pregunta..."
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-2 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl h-fit text-slate-100">
            <h3 className="text-lg font-semibold mb-3">Categorias</h3>

            <ul className="space-y-2 text-sm">
              <li className="bg-[#0f1b34] text-white p-2 rounded-md cursor-pointer">
                General
              </li>
              <li className="p-2 rounded-md cursor-pointer hover:bg-gray-600">
                Envíos y Entregas
              </li>
              <li className="p-2 rounded-md cursor-pointer hover:bg-gray-600">
                Devoluciones
              </li>
              <li className="p-2 rounded-md cursor-pointer hover:bg-gray-600">
                Pagos y Facturación
              </li>
              <li className="p-2 rounded-md cursor-pointer hover:bg-gray-600">
                Cuenta y Seguridad
              </li>
            </ul>

            <div className="mt-6 bg-linear-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold mb-2">
                ¿Necesitas más ayuda?
              </p>                
              <button className="w-full bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-100 font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50"> 
                Contactar Soporte
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <FaqQuestion />
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
