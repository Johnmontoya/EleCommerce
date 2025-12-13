import { useState } from "react";
import { BiEdit, BiPhone, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const PersonalProfile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-100">Personal Profile</h2>
        <button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors flex items-center gap-2"
        >
          <BiEdit size={16} />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <BiUser size={18} className="text-slate-500 mt-1" />
          <div>
            <p className="text-slate-500 text-sm">Full Name</p>
            <p className="text-slate-100 font-medium">John Doe</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MdEmail size={18} className="text-slate-500 mt-1" />
          <div>
            <p className="text-slate-500 text-sm">Email Address</p>
            <p className="text-slate-100 font-medium">john.doe@example.com</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <BiPhone size={18} className="text-slate-500 mt-1" />
          <div>
            <p className="text-slate-500 text-sm">Phone</p>
            <p className="text-slate-100 font-medium">(04) 123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
