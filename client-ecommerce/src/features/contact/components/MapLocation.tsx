const MapLocation = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-6 bg-black border border-zinc-800 p-1 relative font-mono">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] z-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] z-20" />

      <div className="relative h-64 bg-[#050505] flex items-center justify-center overflow-hidden">
        {/* Radar grid background */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #00f0ff 1px, transparent 1px), linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 20px 20px, 20px 20px',
            backgroundPosition: 'center center'
          }}>
        </div>

        {/* Fake Location Marker */}
        <div className="relative flex items-center justify-center z-10 group cursor-pointer">
          <div className="absolute w-24 h-24 border border-[#ff0055]/30 rounded-full animate-ping"></div>
          <div className="absolute w-16 h-16 border border-[#ff0055]/50 rounded-full"></div>
          <div className="w-4 h-4 bg-[#ff0055] shadow-[0_0_15px_#ff0055]"></div>

          {/* Target Reticle */}
          <div className="absolute w-12 h-12 border-t-2 border-l-2 border-[#ff0055] -top-6 -left-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute w-12 h-12 border-b-2 border-r-2 border-[#ff0055] -bottom-6 -right-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div className="absolute bottom-4 left-4 bg-black/80 border border-zinc-800 px-4 py-2 text-xs font-bold tracking-widest text-[#00f0ff] z-10 uppercase flex flex-col gap-1 backdrop-blur-sm">
          <span className="text-white">TARGET_LOC //</span>
          <span>LAT: 4.6097 / LNG: -74.0817</span>
          <span className="text-zinc-500 mt-1">Carrera 13A #9-40, Bogotá</span>
        </div>
      </div>
    </div>
  );
};

export default MapLocation;
