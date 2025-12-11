
const FAQPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto flex justify-start items-center px-4 py-4">
        <p className="text-slate-300 font-light text-sm">
          <span className="hover:text-cyan-400 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-cyan-400 font-medium cursor-pointer">
            Ayuda
          </span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-6 my-8 mx-auto">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-slate-100">
              Centro de Ayuda
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6">
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
          <div className="md:col-span-3 space-y-3 text-slate-100">
            {/* Active Question */}
            <details
              open
              className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl h-fit text-slate-100"
            >
              <summary className="cursor-pointer text-lg font-semibold">
                ¿Cómo puedo rastrear mi pedido?
              </summary>
              <p className="mt-2 text-sm text-[#e2e8f0]">
                Una vez que tu pedido haya sido enviado, recibirás un correo
                electrónico con un número de seguimiento. Puedes ingresar este
                número en la sección{" "}
                <span className="text-[#00c6ff]">Mis Pedidos</span> de tu cuenta
                para ver el estado actual del envío en tiempo real.
              </p>
              <p className="mt-2 text-xs text-[#94a3b8]">
                Nota: La información de seguimiento puede tardar hasta 24 horas
                en actualizarse después del envío.
              </p>
            </details>

            {/* Questions */}
            <details className="bg-slate-900 p-3 rounded-md">
              <summary className="cursor-pointer font-medium">
                ¿Cuáles son los métodos de pago aceptados?
              </summary>
              <p className="mt-2 text-white/70 text-sm">
                Aceptamos tarjetas, PSE y otros métodos.
              </p>
            </details>

            <details className="bg-slate-900 p-3 rounded-md">
              <summary className="cursor-pointer font-medium">
                ¿Puedo cambiar o cancelar mi pedido?
              </summary>
              <p className="mt-2 text-white/70 text-sm">
                Puedes modificarlo antes de que sea enviado.
              </p>
            </details>

            <details className="bg-slate-900 p-3 rounded-md">
              <summary className="cursor-pointer font-medium">
                ¿Hacen envíos internacionales?
              </summary>
              <p className="mt-2 text-white/70 text-sm">
                Sí, realizamos envíos a varios países.
              </p>
            </details>

            <details className="bg-slate-900 p-3 rounded-md">
              <summary className="cursor-pointer font-medium">
                ¿Qué hago si recibo un producto dañado?
              </summary>
              <p className="mt-2 text-white/70 text-sm">
                Contáctanos inmediatamente para resolverlo.
              </p>
            </details>

            <details className="bg-slate-900 p-3 rounded-md">
              <summary className="cursor-pointer font-medium">
                ¿Cuánto tiempo tengo para realizar una devolución?
              </summary>
              <p className="mt-2 text-white/70 text-sm">
                Tienes hasta 30 días desde la entrega.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
