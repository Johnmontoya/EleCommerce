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
    <div className="bg-linear-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-2">Subscribe Now</h3>
      <p className="text-slate-400 text-sm mb-4">
        Get the latest updates delivered to your inbox.
      </p>
      <form onSubmit={handleSubscribe} className="space-y-3">
        <div className="relative">
          <MdEmail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-10 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-100 font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
