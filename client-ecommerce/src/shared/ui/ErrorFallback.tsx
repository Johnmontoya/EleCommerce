import { useNavigate } from "react-router-dom";
// Removed ButtonAction import

interface IErrorFallbackProps {
  resetErrorBoundary: (...args: unknown[]) => void;
}

const ErrorFallback = ({ resetErrorBoundary }: IErrorFallbackProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#ff0055 1px, transparent 1px), linear-gradient(90deg, #ff0055 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

      <div className="border border-[#ff0055] bg-[#050505] p-8 md:p-12 relative max-w-2xl w-full mx-auto shadow-[0_0_30px_rgba(255,0,85,0.15)] z-10">
        {/* Neon Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff0055]"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff0055]"></div>

        <div className="text-center">
          <h1 className="text-7xl md:text-9xl font-extrabold text-[#ff0055] font-mono tracking-widest drop-shadow-[0_0_15px_rgba(255,0,85,0.8)] animate-pulse mb-6">
            500
          </h1>
          <div className="inline-block bg-[#ff0055]/10 border border-[#ff0055]/30 px-6 py-2 mb-6">
            <p className="text-[#ff0055] font-mono text-xl md:text-2xl font-bold uppercase tracking-widest">
              [CRITICAL_SYSTEM_FAILURE]
            </p>
          </div>
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase mb-10 max-w-lg mx-auto leading-relaxed border-l-2 border-[#ff0055] pl-4 text-left">
            AN UNEXPECTED ERROR HAS OCCURRED IN THE MAINFRAME. WE APOLOGIZE FOR THE INCONVENIENCE. PLEASE INITIATE A REBOOT SEQUENCE OR CONTACT SYSTEM ADMINISTRATOR.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => resetErrorBoundary()}
              className="flex items-center justify-center gap-2 border border-[#ff0055] bg-[#ff0055]/10 text-[#ff0055] px-6 py-4 hover:bg-[#ff0055] hover:text-white transition-all font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,0,85,0.3)]"
            >
              [INITIATE_RETRY_SEQUENCE]
            </button>
            <button
              onClick={() => {
                navigate("/", { replace: true });
                window.location.reload();
              }}
              className="flex items-center justify-center gap-2 border border-zinc-800 bg-[#0a0a0a] text-zinc-400 px-6 py-4 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all font-mono text-xs uppercase tracking-widest"
            >
              [ABORT_TO_HOME]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;