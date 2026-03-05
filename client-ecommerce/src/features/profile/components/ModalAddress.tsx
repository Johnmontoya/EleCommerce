import { FaCity } from "react-icons/fa";
import { PiCityFill } from "react-icons/pi";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdLocationCity } from "react-icons/md";
import useInputs from "../../../shared/hooks/useInputs";
import { BiMap, BiSave } from "react-icons/bi";
import type { User } from "../../auth/types/auth.types";
import MiModal from "../../../shared/ui/Modal";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useUpdateAddressMutation } from "../hook/mutation/useProfileMutation";

interface ModalAddressProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: User | undefined;
}

const ModalAddress: React.FC<ModalAddressProps> = ({ isOpen, onClose, data }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const updateAddressMutation = useUpdateAddressMutation();
    const [editAddress, onChangeEditAddress, setEditAddress] = useInputs({
        id: data?.addresses?.[0]?.id || "",
        city: "",
        state: "",
        street: "",
        country: "",
        zipCode: "",
        fullName: null,
        phone: null,
        isDefault: true
    })

    useEffect(() => {
        setEditAddress({
            id: data?.addresses?.[0]?.id || "",
            city: data?.addresses?.[0]?.city || "",
            state: data?.addresses?.[0]?.state || "",
            street: data?.addresses?.[0]?.street || "",
            country: data?.addresses?.[0]?.country || "",
            zipCode: data?.addresses?.[0]?.zipCode || "",
            fullName: null,
            phone: null,
            isDefault: true
        })
    }, [data, setEditAddress])

    const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setIsSubmitting(true);
        try {
            await updateAddressMutation.mutateAsync({ id: editAddress.id || "", addressData: editAddress });
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
            title={`> [EDITAR_COORDINADAS]`}
        >
            <form className="w-full h-[400px] mb-15 overflow-y-scroll text-left font-mono">
                <div className="mb-8">
                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 mb-6">
                        <span className="text-[#00f0ff]">{'>'}</span> [DATOS_DE_UBICACIÓN]
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="w-full">
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-1">
                                [DIRECCIÓN_DE_CALLE]
                            </label>
                            <div className="flex items-center w-full bg-black border border-zinc-800 h-12 overflow-hidden px-4 gap-3 focus-within:border-[#00f0ff] transition-colors">
                                <BiMap size={18} className="text-zinc-600" />
                                <input type="text" name="street" placeholder="[INTRODUCIR_DIRECCIÓN]"
                                    className="w-full bg-transparent text-white placeholder-zinc-700 border-none outline-none text-xs tracking-widest uppercase font-bold"
                                    value={editAddress.street} onChange={onChangeEditAddress} required />
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-1">
                                [SECTOR_DE_LA_CIUDAD]
                            </label>
                            <div className="flex items-center w-full bg-black border border-zinc-800 h-12 overflow-hidden px-4 gap-3 focus-within:border-[#00f0ff] transition-colors">
                                <MdLocationCity size={18} className="text-zinc-600" />
                                <input type="text" name="city" placeholder="[INTRODUCIR_CIUDAD]"
                                    className="w-full bg-transparent text-white placeholder-zinc-700 border-none outline-none text-xs tracking-widest uppercase font-bold"
                                    value={editAddress.city} onChange={onChangeEditAddress} required />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="w-full">
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-1">
                                [ESTADO_O_REGIÓN]
                            </label>
                            <div className="flex items-center w-full bg-black border border-zinc-800 h-12 overflow-hidden px-4 gap-3 focus-within:border-[#00f0ff] transition-colors">
                                <PiCityFill size={18} className="text-zinc-600" />
                                <input type="text" name="state" placeholder="[INTRODUCIR_ESTADO]"
                                    className="w-full bg-transparent text-white placeholder-zinc-700 border-none outline-none text-xs tracking-widest uppercase font-bold"
                                    value={editAddress.state} onChange={onChangeEditAddress} required />
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-1">
                                [TERRITORIO]
                            </label>
                            <div className="flex items-center w-full bg-black border border-zinc-800 h-12 overflow-hidden px-4 gap-3 focus-within:border-[#00f0ff] transition-colors">
                                <FaCity size={18} className="text-zinc-600" />
                                <input type="text" name="country" placeholder="[INTRODUCIR_TERRITORIO]"
                                    className="w-full bg-transparent text-white placeholder-zinc-700 border-none outline-none text-xs tracking-widest uppercase font-bold"
                                    value={editAddress.country} onChange={onChangeEditAddress} required />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-1">
                            [CÓDIGO_POSTAL]
                        </label>
                        <div className="flex items-center w-full bg-black border border-zinc-800 h-12 overflow-hidden px-4 gap-3 focus-within:border-[#00f0ff] transition-colors">
                            <FaMapLocationDot size={18} className="text-zinc-600" />
                            <input type="text" name="zipCode" placeholder="[INTRODUCIR_CÓDIGO_POSTAL]"
                                className="w-full bg-transparent text-white placeholder-zinc-700 border-none outline-none text-xs tracking-widest uppercase font-bold"
                                value={editAddress.zipCode} onChange={onChangeEditAddress} required />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 w-full mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-black border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white h-12 font-black uppercase tracking-widest text-xs transition-colors"
                    >
                        [CANCELAR]
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
                                [GUARDAR_DATOS]
                            </>
                        )}
                    </button>
                </div>
            </form>
        </MiModal>
    )
}
export default ModalAddress