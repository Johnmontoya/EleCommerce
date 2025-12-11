import { FaArrowRight } from "react-icons/fa";
import { Assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

const Promotion = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl flex flex-col md:flex-row mx-auto gap-6 px-2">
      <div
        className="w-full rounded-2xl p-8 text-white relative h-full min-h-[270px] drop-shadow-lg/50 drop-shadow-black-500/50"
        style={{
          backgroundImage: `url(${Assets.Banner1})`,
          backgroundSize: "cover",
        }}
      >
        <p className="text-amber-400 text-xl font-semibold mb-4">
          Descuento del {15}% OFF
        </p>
        <p className="text-xs font-light mb-2 text-cyan-400">AUDIO GEAR</p>
        <h3 className="text-2xl font-bold mb-4">Power Headphones</h3>
        <button onClick={() => navigate(`/product/1`)} className="border-2 rounded-2xl border-slate-400/40 p-4 text-white text-sm font-medium flex items-center hover:scale-105 hover:bg-slate-500/20 transition-all cursor-pointer">
          <p>Comprar Ahora</p>
          <FaArrowRight size={14} className="ml-1" />
        </button>
        <div className="absolute p-2 rounded-xl bg-cyan-500 right-4 top-4 font-light text-5xl">
          <div>
            $127000<span className="text-sm">cop</span>
          </div>
        </div>
      </div>

      <div
        className="w-full rounded-2xl p-8 text-white relative h-full drop-shadow-lg/50 drop-shadow-black-500/50 min-h-[270px]"
        style={{
          backgroundImage: `url(${Assets.Banner2})`,
          backgroundSize: "cover",
        }}
      >
        <p className="text-amber-400 text-xl font-semibold mb-4">
          Descuento del {25}% OFF
        </p>
        <p className="text-sm font-light mb-2 text-green-400">AUDIO GEAR</p>
        <h3 className="text-2xl font-bold mb-4">HOMEPOD PRO</h3>
        <button onClick={() => navigate(`/product/2`)} className="border-2 rounded-2xl border-slate-400/40 p-4 text-white text-sm font-medium flex items-center hover:scale-105 hover:bg-slate-500/20 transition-all cursor-pointer">
          <p>Comprar Ahora</p>
          <FaArrowRight size={14} className="ml-1" />
        </button>
        <div className="absolute p-2 rounded-xl bg-cyan-500 right-4 top-4 font-light text-5xl">
          <div>
            $132000<span className="text-sm">cop</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
