import { useState } from "react";
import { BiEdit, BiPhone, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import type { User } from "../../auth/types/auth.types";
import ButtonAction from "../../../shared/ui/ButtonAction";
import ModalInfo from "../../profile/components/ModalInfo";

interface UserProps {
  user: User | null;
}

const PersonalProfile: React.FC<UserProps> = ({ user }) => {
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  return (
    <>
      <ModalInfo
        isOpen={isEditingProfile}
        onClose={() => setIsEditingProfile(false)}
        title="Cambiar Información Personal"
        data={user!}
      />
      <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-100">Perfil Personal</h2>
          <ButtonAction
            variant="edit"
            text="Editar"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
          >
            <BiEdit size={16} />
          </ButtonAction>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <BiUser size={18} className="text-slate-500 mt-1" />
            <div>
              <p className="text-slate-500 text-sm">Nombre</p>
              <p className="text-slate-100 font-medium">{user?.firstName} {user?.lastName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MdEmail size={18} className="text-slate-500 mt-1" />
            <div>
              <p className="text-slate-500 text-sm">Correo Electronico</p>
              <p className="text-slate-100 font-medium">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BiPhone size={18} className="text-slate-500 mt-1" />
            <div>
              <p className="text-slate-500 text-sm">Telefono</p>
              <p className="text-slate-100 font-medium">{user?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
