import { FaFacebook } from "react-icons/fa";
import { ImGoogle3 } from "react-icons/im";
import { MdEmail } from "react-icons/md";

const ContactInformation = () => {
  return (
    <div className="bg-[#050505] border border-zinc-800 p-8 relative font-mono text-white h-fit">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

      <h2 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-6">
        INFORMACIÓN_DEL_NODO // CONTACTO
      </h2>

      <div className="space-y-8 text-sm">
        <div className="border-l-2 border-[#00f0ff] pl-4">
          <p className="font-bold text-xs tracking-widest uppercase text-zinc-500 mb-1">[UBICACIÓN_HQ]</p>
          <p className="text-zinc-300">
            Carrera 13A #9-40
            <br />
            Bogotá, Colombia
          </p>
        </div>

        <div className="border-l-2 border-[#00f0ff] pl-4">
          <p className="font-bold text-xs tracking-widest uppercase text-zinc-500 mb-1">[COMUNICACIÓN_DIGITAL]</p>
          <p className="text-[#00f0ff]">soporte@ecommerce.com</p>
          <p className="text-[#e4ff00] text-[10px] tracking-widest uppercase mt-1">SLA: &lt; 24H</p>
        </div>

        <div className="border-l-2 border-[#00f0ff] pl-4">
          <p className="font-bold text-xs tracking-widest uppercase text-zinc-500 mb-1">[ENLACE_DE_VOZ]</p>
          <p className="text-zinc-300">(+04) 123 456 7890</p>
          <p className="text-zinc-500 text-[10px] tracking-widest uppercase mt-1">LUN-VIE: 0900 - 1800</p>
        </div>
      </div>

      <div className="flex gap-4 mt-8 pt-8 border-t border-zinc-800">
        <div className="flex justify-center items-center w-10 h-10 bg-black border border-zinc-800 hover:border-[#00f0ff] text-zinc-500 hover:text-[#00f0ff] transition-colors cursor-pointer group">
          <MdEmail size={18} className="group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex justify-center items-center w-10 h-10 bg-black border border-zinc-800 hover:border-[#00f0ff] text-zinc-500 hover:text-[#00f0ff] transition-colors cursor-pointer group">
          <ImGoogle3 size={18} className="group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex justify-center items-center w-10 h-10 bg-black border border-zinc-800 hover:border-[#00f0ff] text-zinc-500 hover:text-[#00f0ff] transition-colors cursor-pointer group">
          <FaFacebook size={18} className="group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
