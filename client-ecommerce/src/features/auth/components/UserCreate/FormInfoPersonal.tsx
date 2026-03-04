import { BiPhone, BiUser } from "react-icons/bi";
import type { User } from "../../types/auth.types";

interface FormInfoPersonalProps {
    userData: User;
    onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getFieldsError: (fieldName: string) => string | undefined;
    setUserData: React.Dispatch<React.SetStateAction<User>>;
}
const FormInfoPersonal: React.FC<FormInfoPersonalProps> = ({
    userData,
    onChangeCreateData,
    getFieldsError,
    setUserData,
}) => {

    const generateUsername = () => {
        if (userData.firstName && userData.lastName) {
            const username =
                `${userData.firstName}.${userData.lastName}`.toLowerCase();
            setUserData({ ...userData, username });
        }
    };

    return (
        <div className="bg-[#050505] border border-zinc-800 p-6 relative">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50 pointer-events-none" />

            <h2 className="text-[#00f0ff] font-mono text-[12px] font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                <BiUser size={16} className="text-[#00f0ff]" />
                [INFO_PERSONAL_SISTEMA]
            </h2>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                        [NOMBRE] *
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName || ""}
                        onChange={onChangeCreateData}
                        className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 rounded-none outline-none focus:border-[#00f0ff] font-mono text-[10px] uppercase tracking-widest transition-all"
                        placeholder="[INPUT_NAME]"
                    />
                    <div className="text-[#ff0055] font-mono text-[10px] uppercase tracking-widest mt-1">
                        {getFieldsError?.("firstName")}
                    </div>
                </div>

                <div>
                    <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                        [APELLIDO] *
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName || ""}
                        onChange={onChangeCreateData}
                        className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 rounded-none outline-none focus:border-[#00f0ff] font-mono text-[10px] uppercase tracking-widest transition-all"
                        placeholder="[INPUT_SURNAME]"
                    />
                    <div className="text-[#ff0055] font-mono text-[10px] uppercase tracking-widest mt-1">
                        {getFieldsError?.("lastName")}
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                        [ID_USUARIO]
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="username"
                            value={userData.username || ""}
                            onChange={onChangeCreateData}
                            className="flex-1 bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 rounded-none outline-none focus:border-[#00f0ff] font-mono text-[10px] uppercase tracking-widest transition-all"
                            placeholder="[INPUT_ID]"
                        />
                        <button
                            type="button"
                            onClick={generateUsername}
                            className="bg-[#e4ff00]/10 border border-[#e4ff00] text-[#e4ff00] hover:bg-[#e4ff00]/20 px-4 py-3 rounded-none font-bold uppercase tracking-widest text-[10px] transition-all whitespace-nowrap"
                        >
                            [GEN_AUTO]
                        </button>
                    </div>
                    <div className="text-[#ff0055] font-mono text-[10px] uppercase tracking-widest mt-1">
                        {getFieldsError?.("username")}
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                        [TELEFONO]
                    </label>
                    <div className="relative">
                        <BiPhone
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00f0ff]"
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={userData.phone || ""}
                            onChange={onChangeCreateData}
                            className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 pl-10 rounded-none outline-none focus:border-[#00f0ff] font-mono text-[10px] uppercase tracking-widest transition-all"
                            placeholder="[+XX XXX XXX XXXX]"
                        />
                    </div>
                    <div className="text-[#ff0055] font-mono text-[10px] uppercase tracking-widest mt-1">
                        {getFieldsError?.("phone")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormInfoPersonal;