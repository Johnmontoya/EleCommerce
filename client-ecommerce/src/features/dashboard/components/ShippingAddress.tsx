import { useState } from "react";
import { BiMapPin } from "react-icons/bi";

const ShippingAddress = () => {
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-100">Shipping Address</h2>
        <button
          onClick={() => setIsEditingAddress(!isEditingAddress)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
        >
          Change
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <BiMapPin size={18} className="text-slate-500 mt-1" />
          <div>
            <p className="text-slate-100 font-semibold mb-2">John Doe</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Carrera 13A #9-40
              <br />
              Bogotá, D.C.
              <br />
              Colombia
            </p>
          </div>
        </div>

        <button className="w-full mt-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 py-2 rounded-lg font-semibold text-sm transition-all">
          Default Address
        </button>
      </div>
    </div>
  );
};

export default ShippingAddress;
