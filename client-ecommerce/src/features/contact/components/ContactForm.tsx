import { FaArrowRight } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div className="lg:col-span-2 bg-[#050505] border border-zinc-800 p-8 relative font-mono">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff0055]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff0055]" />

      <h2 className="text-xs font-bold text-[#ff0055] uppercase tracking-[0.2em] mb-2">
        TRANSMIT_MESSAGE //
      </h2>
      <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-8">
        SUBMIT DATA FOR PROCESSING. RESPONSE TIME ESTIMATED &lt; 24H.
      </p>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[FULL_NAME]</label>
            <input
              className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#ff0055] transition-colors text-sm font-bold uppercase tracking-widest"
              placeholder="ENTER_NAME..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[EMAIL_ADDRESS]</label>
            <input
              className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#ff0055] transition-colors text-sm font-bold uppercase tracking-widest"
              placeholder="ENTER_EMAIL..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[COMM_LINK_ID]</label>
            <input
              className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#ff0055] transition-colors text-sm font-bold uppercase tracking-widest"
              placeholder="ENTER_PHONE..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[QUERY_TYPE]</label>
            <select className="w-full bg-black border border-zinc-800 text-white px-4 py-3 outline-none focus:border-[#ff0055] transition-colors text-sm font-bold uppercase tracking-widest appearance-none">
              <option>TECHNICAL_SUPPORT</option>
              <option>SALES_QUERY</option>
              <option>GENERAL_INFO</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">[DATA_PAYLOAD]</label>
          <textarea
            rows={5}
            className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#ff0055] transition-colors text-sm tracking-wide resize-none"
            placeholder="HOW CAN WE ASSIST?"
          />
        </div>

        <button className="flex flex-row items-center gap-3 bg-[#ff0055] hover:bg-white text-white hover:text-[#ff0055] border border-[#ff0055] px-6 py-3 font-bold transition-colors uppercase tracking-[0.2em] text-xs">
          <span>DISPATCH_MESSAGE</span>
          <FaArrowRight size={14} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
