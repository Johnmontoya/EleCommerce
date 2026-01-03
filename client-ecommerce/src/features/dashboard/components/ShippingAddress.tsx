import { useState } from "react";
import { BiMapPin } from "react-icons/bi";
import ButtonAction from "../../../shared/ui/ButtonAction";
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
      <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-100">Direccion de envio</h2>
          <ButtonAction
            variant="edit"
            text="Cambiar"
            onClick={() => setIsModalOpenAddress(!isModalOpenAddress)}
          >
            <MdPublishedWithChanges size={16} />
          </ButtonAction>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <BiMapPin size={18} className="text-slate-500 mt-1" />
            <div>
              <p className="text-slate-100 font-semibold mb-2">{user?.firstName} {user?.lastName}</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {user?.addresses?.[0].street || "No especificado"}
                <br />
                {user?.addresses?.[0].city || "No especificado"}
                <br />
                {user?.addresses?.[0].country || "No especificado"}
              </p>
            </div>
          </div>

          <div className="w-full text-center mt-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 py-2 rounded-lg font-semibold text-sm transition-all">
            Direccion actual
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
