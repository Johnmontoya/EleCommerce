import MiModal from "../../../shared/ui/Modal";
import { BiPhone, BiSave, BiUser } from "react-icons/bi";
import type { User } from "../../auth/types/auth.types";
import useInputs from "../../../shared/hooks/useInputs";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../auth/hooks/mutation/useAuthMutation";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ModalInfoProps {
    isOpen: boolean;
    onClose: () => void;
    data: User | undefined;
}
const ModalInfo: React.FC<ModalInfoProps> = ({ isOpen, onClose, data }) => {
    const updateUserMutation = useUpdateUserMutation();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [editProfile, onChangeEditProfile, setEditProfile] = useInputs({
        firstName: "",
        lastName: "",
        phone: ""
    })

    useEffect(() => {
        setEditProfile({
            firstName: data?.firstName,
            lastName: data?.lastName,
            phone: data?.phone
        })
    }, [data])

    const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setIsSubmitting(true);
        try {
            await updateUserMutation.mutateAsync({ id: data?.id!, userData: editProfile });

        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.errors) {
                toast.error(error.response.data.errors);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <MiModal
            isOpen={isOpen}
            onClose={onClose}
            title={`> [EDIT_RECORD]`}
        >
            <form className="w-full text-left font-mono">
                <div className="mb-8">
                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 mb-6">
                        <span className="text-[#00f0ff]">{'>'}</span> [PERSONAL_DATA]
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="w-full">
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-1">
                                [FIRST_NAME]
                            </label>
                            <div className="flex items-center w-full bg-black border border-zinc-800 h-12 overflow-hidden px-4 gap-3 focus-within:border-[#00f0ff] transition-colors">
                                <BiUser size={18} className="text-zinc-600" />
                                <input type="text" name="firstName" placeholder="[ENTER_NAME]"
                                    className="w-full bg-transparent text-white placeholder-zinc-700 border-none outline-none text-xs tracking-widest uppercase font-bold"
                                    value={editProfile.firstName} onChange={onChangeEditProfile} required />
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-1">
                                [LAST_NAME]
                            </label>
                            <div className="flex items-center w-full bg-black border border-zinc-800 h-12 overflow-hidden px-4 gap-3 focus-within:border-[#00f0ff] transition-colors">
                                <BiUser size={18} className="text-zinc-600" />
                                <input type="text" name="lastName" placeholder="[ENTER_LASTNAME]"
                                    className="w-full bg-transparent text-white placeholder-zinc-700 border-none outline-none text-xs tracking-widest uppercase font-bold"
                                    value={editProfile.lastName} onChange={onChangeEditProfile} required />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-1">
                            [COMM_LINK]
                        </label>
                        <div className="flex items-center w-full bg-black border border-zinc-800 h-12 overflow-hidden px-4 gap-3 focus-within:border-[#00f0ff] transition-colors">
                            <BiPhone size={18} className="text-zinc-600" />
                            <input type="text" name="phone" placeholder="[ENTER_PHONE]"
                                className="w-full bg-transparent text-white placeholder-zinc-700 border-none outline-none text-xs tracking-widest uppercase font-bold"
                                value={editProfile.phone} onChange={onChangeEditProfile} required />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 w-full mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-black border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white h-12 font-black uppercase tracking-widest text-xs transition-colors"
                    >
                        [CANCEL]
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-[#050505] border border-[#00f0ff] hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black h-12 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        ) : (
                            <>
                                <BiSave size={16} />
                                [SAVE_DATA]
                            </>
                        )}
                    </button>
                </div>
            </form>
        </MiModal>
    )
}

export default ModalInfo