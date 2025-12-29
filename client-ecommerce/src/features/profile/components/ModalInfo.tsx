import ButtonAction from "../../../shared/ui/ButtonAction";
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
    title: string;
    data: User;
}
const ModalInfo: React.FC<ModalInfoProps> = ({ isOpen, onClose, title, data }) => {
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
            await updateUserMutation.mutateAsync({ id: data.id!, userData: editProfile });

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
            title={title}
        >
            <form
                className="w-full text-center">

                <div className="my-2">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                        <BiUser size={20} className="text-cyan-400" />
                        Información Personal
                    </h2>
                    <div className="flex flex-row items-center justify-center mt-6 gap-2">
                        <div>
                            <label className="block text-xs float-left text-slate-300 font-semibold">
                                Nombre
                            </label>
                            <div className="flex items-center w-full bg-gray-800 border border-gray-700 h-12 rounded-lg overflow-hidden pl-6 gap-2 ">
                                <BiUser size={20} className="text-slate-100" />
                                <input type="text" name="firstName" placeholder="Nombre"
                                    className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
                                    value={editProfile.firstName} onChange={onChangeEditProfile} required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs float-left text-slate-300 font-semibold">
                                Apellido
                            </label>
                            <div className="flex items-center w-full bg-gray-800 border border-gray-700 h-12 rounded-lg overflow-hidden pl-6 gap-2 ">
                                <BiUser size={20} className="text-slate-100" />
                                <input type="text" name="lastName" placeholder="Apellido"
                                    className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
                                    value={editProfile.lastName} onChange={onChangeEditProfile} required />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <label className="block text-xs float-left text-slate-300 font-semibold">
                            Telefono
                        </label>
                        <div className="flex items-center w-full bg-gray-800 border border-gray-700 h-12 rounded-lg overflow-hidden pl-6 gap-2 ">
                            <BiPhone size={20} className="text-slate-100" />
                            <input type="text" name="phone" placeholder="Telefono"
                                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
                                value={editProfile.phone} onChange={onChangeEditProfile} required />
                        </div>
                    </div>
                </div>

                <ButtonAction variant="primary" onClick={handleSubmit} text="Guardar" className="w-full flex mt-6 justify-center items-center">
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        </>
                    ) : (
                        <>
                            <BiSave size={18} />
                        </>
                    )}
                </ButtonAction>
            </form>
        </MiModal>
    )
}

export default ModalInfo