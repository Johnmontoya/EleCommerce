import React, { useState } from "react";
import { MdEmail } from "react-icons/md";

const Subscribe = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-6">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#e4ff00]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#e4ff00]" />
      <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-2">
        SYS_COMMS // SUBSCRIBE
      </h3>
      <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-6">
        ESTABLISH DIRECT LINK FOR LATEST_UPDATES.
      </p>
      <form onSubmit={handleSubscribe} className="space-y-4">
        <div className="relative">
          <MdEmail
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="email"
            placeholder="ENTER_EMAIL..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-10 py-3 outline-none focus:border-[#e4ff00] transition-colors text-xs font-bold uppercase tracking-widest"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#e4ff00] text-black hover:bg-black hover:text-[#e4ff00] border border-[#e4ff00] font-bold py-3 transition-colors text-xs tracking-[0.2em] uppercase"
        >
          INITIATE_LINK
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
