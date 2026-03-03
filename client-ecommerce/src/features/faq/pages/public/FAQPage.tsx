import FaqQuestion from "../../components/FaqQuestion";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-[#020202] relative font-mono text-white pb-12">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-4 pt-12 pb-8 mx-auto relative z-10">
        <div className="flex-1">
          <div className="flex flex-col gap-2 items-start justify-start mb-8 border-l-4 border-[#ff0055] pl-6">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              SYS_SUPPORT // FAQ
            </h1>
            <p className="text-zinc-500 max-w-2xl font-mono text-sm tracking-widest uppercase">
              &gt; DATA_KNOWLEDGEBASE | TROUBLESHOOTING_GUIDES | TRANSMISSION_LOGS
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 pb-8 relative z-10">
        <p className="text-[#00f0ff] mb-6 text-sm tracking-widest uppercase font-bold">
          [ INPUT QUERY PARAMETERS ]
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-xl mb-10 relative group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />
          <input
            type="text"
            placeholder="EXECUTE_SEARCH >"
            className="w-full bg-[#050505] border border-zinc-800 text-white placeholder-zinc-600 px-6 py-4 outline-none focus:border-[#00f0ff] transition-colors text-sm font-bold uppercase tracking-widest"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-[#050505] border border-zinc-800 p-8 relative h-fit text-white">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff0055]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff0055]" />

            <h3 className="text-xs font-bold text-[#ff0055] tracking-[0.2em] uppercase mb-6">
              DIR_CATEGORIES //
            </h3>

            <ul className="space-y-1 text-xs tracking-widest uppercase font-bold text-zinc-400">
              <li className="bg-[#ff0055]/10 text-[#ff0055] border-l-2 border-[#ff0055] p-3 cursor-pointer">
                &gt; General
              </li>
              <li className="p-3 border-l-2 border-transparent hover:border-zinc-500 hover:text-white hover:bg-zinc-900 cursor-pointer transition-colors">
                Envíos y Entregas
              </li>
              <li className="p-3 border-l-2 border-transparent hover:border-zinc-500 hover:text-white hover:bg-zinc-900 cursor-pointer transition-colors">
                Devoluciones
              </li>
              <li className="p-3 border-l-2 border-transparent hover:border-zinc-500 hover:text-white hover:bg-zinc-900 cursor-pointer transition-colors">
                Pagos y Facturación
              </li>
              <li className="p-3 border-l-2 border-transparent hover:border-zinc-500 hover:text-white hover:bg-zinc-900 cursor-pointer transition-colors">
                Cuenta y Seguridad
              </li>
            </ul>

            <div className="mt-8 border-t border-zinc-800 pt-6">
              <p className="text-[#00f0ff] text-[10px] tracking-widest uppercase mb-4">
                [ REQUIRES_HUMAN_OVERRIDE ? ]
              </p>
              <button className="w-full bg-[#ff0055] text-white hover:bg-white hover:text-[#ff0055] font-bold py-3 transition-colors text-xs tracking-widest uppercase border border-[#ff0055]">
                INITIATE_CONTACT
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
