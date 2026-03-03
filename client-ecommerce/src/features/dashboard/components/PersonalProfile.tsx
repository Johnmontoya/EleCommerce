import { useState } from "react";
import { BiEdit, BiPhone, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import type { User } from "../../auth/types/auth.types";
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
      <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#e4ff00]" />

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-widest">
              [USER_PROFILE]
            </h2>
          </div>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-[#e4ff00] hover:text-white hover:bg-[#e4ff00]/10 border border-transparent hover:border-[#e4ff00] px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-2 uppercase tracking-widest"
          >
            <span>[EDIT]</span>
            <BiEdit size={14} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-black border border-zinc-800 flex items-center justify-center shrink-0">
              <BiUser size={16} className="text-[#e4ff00]" />
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">[FULL_NAME]</p>
              <p className="text-white font-bold tracking-wider text-sm">{user?.firstName} {user?.lastName}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-black border border-zinc-800 flex items-center justify-center shrink-0">
              <MdEmail size={16} className="text-[#e4ff00]" />
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">[EMAIL_LINK]</p>
              <p className="text-white font-bold tracking-wider text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-black border border-zinc-800 flex items-center justify-center shrink-0">
              <BiPhone size={16} className="text-[#e4ff00]" />
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">[VOICE_COMMS]</p>
              <p className="text-white font-bold tracking-wider text-sm">{user?.phone || 'UNREGISTERED'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
