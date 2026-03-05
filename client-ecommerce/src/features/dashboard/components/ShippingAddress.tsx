import { useState } from "react";
import { BiMapPin } from "react-icons/bi";
import { MdPublishedWithChanges } from "react-icons/md";
import type { User } from "../../auth/types/auth.types";
import ModalAddress from "../../profile/components/ModalAddress";

interface UserProps {
  user: User | null;
}

const ShippingAddress: React.FC<UserProps> = ({ user }) => {
  const [isModalOpenAddress, setIsModalOpenAddress] = useState<boolean>(false);

  return (
    <>
      <ModalAddress
        isOpen={isModalOpenAddress}
        onClose={() => setIsModalOpenAddress(false)}
        title="Agregar Dirección"
        data={user!}
      />
      <div className="md:w-full w-82 bg-[#050505] border border-zinc-800 p-6 relative font-mono h-[100%]">
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff0055]" />

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-widest">
              [DIRECCIÓN_DE_ENTREGA]
            </h2>
          </div>
          <button
            onClick={() => setIsModalOpenAddress(!isModalOpenAddress)}
            className="text-[#ff0055] hover:text-white hover:bg-[#ff0055]/10 border border-transparent hover:border-[#ff0055] px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-2 uppercase tracking-widest"
          >
            <span>[ACTUALIZAR]</span>
            <MdPublishedWithChanges size={14} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-black border border-zinc-800 flex items-center justify-center shrink-0">
              <BiMapPin size={16} className="text-[#ff0055]" />
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">
                [{user?.firstName?.toUpperCase()}_{user?.lastName?.toUpperCase()}]
              </p>
              <div className="text-white font-bold tracking-wider text-sm leading-relaxed">
                {user?.addresses && user.addresses.length > 0 ? (
                  <>
                    <p>{user.addresses[0].street}</p>
                    <p>{user.addresses[0].city}</p>
                    <p>{user.addresses[0].country}</p>
                  </>
                ) : (
                  <span className="text-zinc-600">[DATOS_NO_ENCONTRADOS]</span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full text-center mt-6 bg-[#ff0055]/10 border border-[#ff0055]/30 text-[#ff0055] py-3 text-xs font-bold tracking-widest uppercase">
            [DIRECCIÓN_ACTIVA]
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
