import { Assets } from "../../../assets/assets";

const Features = () => {
  return (
    <div className="bg-[#020202] py-1 border-t border-zinc-900 border-dashed">
      <section className="max-w-7xl mx-auto px-4 my-16">
        <div className="flex items-center justify-center gap-4 mb-16 w-full">
          <div className="h-[1px] bg-zinc-800 flex-1 hidden md:block max-w-xs" />
          <h1 className="font-bold text-2xl text-white uppercase tracking-[0.2em]" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            CAPACIDADES DEL SISTEMA //
          </h1>
          <div className="h-[1px] bg-zinc-800 flex-1 hidden md:block max-w-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center group border border-zinc-800 bg-[#050505] p-6 hover:border-[#00f0ff] transition-all relative">
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-black border border-zinc-800 grayscale group-hover:grayscale-0 transition-all p-4">
              <img src={Assets.Features1} className="w-16" />
            </div>
            <h4 className="font-bold text-[#e4ff00] mb-3 text-sm tracking-widest font-mono">ENVÍO GRATIS</h4>
            <p className="text-xs text-zinc-500 font-mono tracking-wide">
              AUTORIZADO A CLÚSTERES DE EE. UU. Y PEDIDOS SUPERIORES A 15K CRÉDITOS.
            </p>
          </div>
          <div className="text-center group border border-zinc-800 bg-[#050505] p-6 hover:border-[#00f0ff] transition-all relative">
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-black border border-zinc-800 grayscale group-hover:grayscale-0 transition-all p-4">
              <img src={Assets.Features2} className="w-16" />
            </div>
            <h4 className="font-bold text-[#e4ff00] mb-3 text-sm tracking-widest font-mono">PAGO SEGURO</h4>
            <p className="text-xs text-zinc-500 font-mono tracking-wide">
              TRANSACCIONES ENCRIPTADAS: VISA, AMEX, PAYPAL, MASTERCARD.
            </p>
          </div>
          <div className="text-center group border border-zinc-800 bg-[#050505] p-6 hover:border-[#00f0ff] transition-all relative">
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-black border border-zinc-800 grayscale group-hover:grayscale-0 transition-all p-4">
              <img src={Assets.Features3} className="w-16" />
            </div>
            <h4 className="font-bold text-[#e4ff00] mb-3 text-sm tracking-widest font-mono">1_AÑO_DE_GARANTÍA</h4>
            <p className="text-xs text-zinc-500 font-mono tracking-wide">
              HARDWARE PROTEGIDO CONTRA DEFECTOS DE FABRICACIÓN.
            </p>
          </div>
          <div className="text-center group border border-zinc-800 bg-[#050505] p-6 hover:border-[#00f0ff] transition-all relative">
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-black border border-zinc-800 grayscale group-hover:grayscale-0 transition-all p-4">
              <img src={Assets.Features4} className="w-16" />
            </div>
            <h4 className="font-bold text-[#e4ff00] mb-3 text-sm tracking-widest font-mono">SOPORTE 24/7</h4>
            <p className="text-xs text-zinc-500 font-mono tracking-wide">
              COMM-LINK SIEMPRE ACTIVO. CONECTA: 0123-456-789.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
