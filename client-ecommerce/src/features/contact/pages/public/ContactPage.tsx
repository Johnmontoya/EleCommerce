import ContactForm from "../../components/ContactForm";
import ContactInformation from "../../components/ContactInformation";
import MapLocation from "../../components/MapLocation";

const ContactPage = () => {
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
          <div className="flex flex-col gap-2 items-start justify-start mb-8 border-l-4 border-[#e4ff00] pl-6">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              SYS_COMMS // CONTACT
            </h1>
            <p className="text-zinc-500 max-w-2xl font-mono text-sm tracking-widest uppercase">
              &gt; DIRECT_LINK | SUPPORT_CHANNELS | LOCATION_DATA
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 text-white gap-8 px-4 pb-8 relative z-10">
        {/* Form Section */}
        <ContactForm />

        {/* Contact Info */}
        <ContactInformation />

        {/* FAQ */}
        <div className="bg-[#050505] border border-zinc-800 p-8 relative h-fit space-y-6">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

          <h2 className="text-xs font-bold text-[#00f0ff] uppercase tracking-[0.2em] mb-4">
            QUICK_FAQ //
          </h2>

          <div className="space-y-4">
            <details className="bg-black border border-zinc-800 p-4 relative group open:border-[#00f0ff]/50 transition-colors">
              <summary className="cursor-pointer text-xs font-bold tracking-widest uppercase text-[#00f0ff] list-none flex items-center gap-2">
                <span className="text-white group-open:text-[#00f0ff] transition-colors">&gt;</span> Envíanos internacionales?
              </summary>
              <div className="mt-4 pl-4 border-l border-zinc-800 text-zinc-400 text-xs leading-relaxed">
                Sí, enviamos a varios países.
              </div>
            </details>

            <details className="bg-black border border-zinc-800 p-4 relative group transition-colors hover:border-zinc-700">
              <summary className="cursor-pointer text-xs font-bold tracking-widest uppercase text-zinc-300 list-none flex items-center gap-2">
                <span className="text-zinc-600 group-hover:text-white transition-colors">&gt;</span> Tiempo de respuesta?
              </summary>
              <div className="mt-4 pl-4 border-l border-zinc-800 text-zinc-400 text-xs leading-relaxed">
                Nuestro tiempo promedio es 24h.
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative z-10 px-4">
        <MapLocation />
      </div>
    </div>
  );
};

export default ContactPage;
