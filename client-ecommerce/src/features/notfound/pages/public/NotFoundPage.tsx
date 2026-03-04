import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-[#020202] text-zinc-300 flex items-center justify-center p-4 relative overflow-hidden flex-col">
            {/* Subtle Background Detail */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl w-full text-center">
                {/* Error Code */}
                <div className="relative mb-8">
                    <h1 className="text-8xl md:text-[12rem] font-extrabold text-[#00f0ff] font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] leading-none">
                        404
                    </h1>
                    {/* Glitch/Accent Element */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#00f0ff] opacity-50 -translate-y-1/2 mix-blend-screen shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>
                </div>

                {/* Title */}
                <div className="border-t border-b border-zinc-800 py-4 mb-6 w-full max-w-md mx-auto">
                    <p className="text-xl md:text-2xl font-bold text-zinc-100 font-mono tracking-widest uppercase">
                        [RESOURCE_NOT_LOCATED]
                    </p>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm mt-4 text-zinc-500 max-w-md text-center font-mono uppercase tracking-widest leading-relaxed border-l-2 border-zinc-700 pl-4 mx-auto mb-10 text-left">
                    THE REQUESTED DIRECTORY OR FILE HAS BEEN EXPUNGED, RELOCATED, OR IS CURRENTLY INACCESSIBLE. PLEASE VERIFY THE COORDINATES.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 border border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] px-8 py-4 hover:bg-[#00f0ff] hover:text-black transition-all font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    >
                        [ &lt; INITIATE_RETURN_SEQUENCE ]
                    </Link>
                    <a
                        href="#"
                        className="flex items-center justify-center gap-2 border border-zinc-800 bg-[#0a0a0a] text-zinc-400 px-8 py-4 hover:border-[#ff0055] hover:text-[#ff0055] transition-all font-mono text-xs uppercase tracking-widest"
                    >
                        [ CONTACT_HQ_SUPPORT ]
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
