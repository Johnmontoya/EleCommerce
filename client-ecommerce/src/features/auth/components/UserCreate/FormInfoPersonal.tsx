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
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <BiUser size={20} className="text-cyan-400" />
                Información Personal
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                        Nombre *
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName || ""}
                        onChange={onChangeCreateData}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="John"
                    />
                    <div className="text-red-500 text-sm mt-1">
                        {getFieldsError?.("firstName")}
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                        Apellido *
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName || ""}
                        onChange={onChangeCreateData}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="Doe"
                    />
                    <div className="text-red-500 text-sm mt-1">
                        {getFieldsError?.("lastName")}
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-slate-300 font-semibold mb-2">
                        Username
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="username"
                            value={userData.username || ""}
                            onChange={onChangeCreateData}
                            className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="john.doe"
                        />
                        <button
                            type="button"
                            onClick={generateUsername}
                            className="bg-slate-600 hover:bg-slate-500 text-slate-200 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap"
                        >
                            Generar
                        </button>
                    </div>
                    <div className="text-red-500 text-sm mt-1">
                        {getFieldsError?.("username")}
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-slate-300 font-semibold mb-2">
                        Teléfono
                    </label>
                    <div className="relative">
                        <BiPhone
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={userData.phone || ""}
                            onChange={onChangeCreateData}
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="+57 300 123 4567"
                        />
                    </div>
                    <div className="text-red-500 text-sm mt-1">
                        {getFieldsError?.("phone")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormInfoPersonal;