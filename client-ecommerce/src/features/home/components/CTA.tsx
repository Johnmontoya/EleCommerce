import { Assets } from "../../../assets/assets";

const CTA = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around rounded-none border border-zinc-800 bg-[#050505] m-2 my-16 w-full relative overflow-hidden group">
      {/* Decorative Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-0 pointer-events-none" />

      {/* Tech Accents Left/Right */}
      <div className="absolute top-0 left-0 w-1 h-12 bg-zinc-700" />
      <div className="absolute bottom-0 right-0 w-1 h-12 bg-[#00f0ff]" />

      <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-12 relative z-10 w-full md:w-1/2">
        <p className="text-[#00f0ff] font-mono text-xs tracking-[0.2em] mb-4 uppercase inline-block border-b border-[#00f0ff] pb-1 w-fit">
          ACCESO MÓVIL //
        </p>
        <h2 className="md:text-5xl text-3xl font-bold text-white uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          DESCARGA LA APP
        </h2>
        <p className="text-zinc-500 font-mono text-xs mt-4 w-11/12 leading-relaxed tracking-wide">
          SINCRONIZA TUS COMPRAS A TRAVÉS DE <span className="text-zinc-300 font-bold">iOS</span> & <span className="text-zinc-300 font-bold">ANDROID</span> SISTEMAS. MANTÉN CONTROL TOTAL SOBRE TUS TRANSACCIONES DE FORMA REMOTA.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mt-10">
          <button
            aria-label="googlePlayBtn"
            className="hover:-translate-y-1 transition-transform border border-zinc-700 bg-black p-2 relative"
            type="button"
          >
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00f0ff] z-20" />
            <img
              className="md:w-40 w-28 grayscale hover:grayscale-0 transition-all duration-300"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtn.svg"
              alt="googlePlayBtn"
            />
          </button>
          <button
            aria-label="appleStoreBtn"
            className="hover:-translate-y-1 transition-transform border border-zinc-700 bg-black p-2 relative"
            type="button"
          >
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white z-20" />
            <img
              className="md:w-40 w-28 grayscale hover:grayscale-0 transition-all duration-300"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtn.svg"
              alt="appleStoreBtn"
            />
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full md:w-auto flex justify-center mt-8 md:mt-0 p-4 border-t border-zinc-800 md:border-none md:border-l md:pl-10">
        {/* Reticle / Target graphic behind Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-64 h-64 border border-[#00f0ff] rounded-full" />
          <div className="absolute w-[300px] h-[1px] bg-[#00f0ff]" />
          <div className="absolute w-[1px] h-[300px] bg-[#00f0ff]" />
        </div>
        <img
          className="max-w-[325px] relative z-10 drop-shadow-[0_0_15px_rgba(0,240,255,0.1)] grayscale group-hover:grayscale-0 transition-all duration-700"
          src={Assets.Women}
          alt="excitedWomenImage"
        />
      </div>
    </div>
  );
};

export default CTA;
