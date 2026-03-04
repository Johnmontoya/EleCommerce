const LoadingFallback = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]/95 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-6">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwTDAgMEwwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-20 pointer-events-none -z-10 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4"></div>

        {/* Core Loading Element */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer spinning brackets */}
          <div className="absolute inset-0 border border-zinc-800 animate-[spin_4s_linear_infinite]">
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] -translate-x-0.5 -translate-y-0.5"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] translate-x-0.5 -translate-y-0.5"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] -translate-x-0.5 translate-y-0.5"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] translate-x-0.5 translate-y-0.5"></div>
          </div>

          {/* Inner pulsing square */}
          <div className="w-8 h-8 bg-[#00f0ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] animate-pulse">
          </div>

          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#00f0ff] animate-ping"></span>
            [INICIANDO_SISTEMA...]
          </h2>
          <div className="flex items-center gap-1">
            <div className="h-[1px] w-6 bg-[#00f0ff]/30"></div>
            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider animate-pulse">ESTABLECIENDO_ENLACE_SEGURO</span>
            <div className="h-[1px] w-6 bg-[#00f0ff]/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;
