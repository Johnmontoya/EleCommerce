import { FaCity } from "react-icons/fa";
import { PiCityFill } from "react-icons/pi";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdLocationCity } from "react-icons/md";
import useInputs from "../../../shared/hooks/useInputs";
import { BiMap } from "react-icons/bi";
import type { User } from "../../auth/types/auth.types";
import MiModal from "../../../shared/ui/Modal";
import { useEffect } from "react";

interface ModalAddressProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: User;
}

const ModalAddress: React.FC<ModalAddressProps> = ({ isOpen, onClose, title, data }) => {
    const [editAddress, onChangeEditAddress, setEditAddress] = useInputs({
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
    })

    useEffect(() => {
        setEditAddress({
            address: data?.addresses![0].street,
            city: data?.addresses![0].city,
            state: data?.addresses![0].state,
            country: data?.addresses![0].country,
            zipCode: data?.addresses![0].zipCode
        })
    }, [data])

    return (
        <MiModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <div className="my-2">
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <BiMap size={20} className="text-cyan-400" />
                    Información de envio
                </h2>
                <div className="flex flex-row items-center justify-center mt-6 gap-2">
                    <div>
                        <label className="block text-xs float-left text-slate-300 font-semibold">
                            Direccion
                        </label>
                        <div className="flex items-center w-full bg-gray-800 border border-gray-700 h-12 rounded-lg overflow-hidden pl-6 gap-2 ">
                            <BiMap size={20} className="text-slate-100" />
                            <input type="text" name="address" placeholder="Direccion"
                                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
                                value={editAddress.address} onChange={onChangeEditAddress} required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs float-left text-slate-300 font-semibold">
                            Ciudad
                        </label>
                        <div className="flex items-center w-full bg-gray-800 border border-gray-700 h-12 rounded-lg overflow-hidden pl-6 gap-2 ">
                            <MdLocationCity size={20} className="text-slate-100" />
                            <input type="text" name="city" placeholder="Ciudad"
                                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
                                value={editAddress.city} onChange={onChangeEditAddress} required />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center mt-2 gap-2">
                    <div>
                        <label className="block text-xs float-left text-slate-300 font-semibold">
                            Estado
                        </label>
                        <div className="flex items-center mt-2 w-full bg-gray-800 border border-gray-700 h-12 rounded-lg overflow-hidden pl-6 gap-2 ">
                            <PiCityFill size={20} className="text-slate-100" />
                            <input type="text" name="state" placeholder="Estado"
                                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
                                value={editAddress.state} onChange={onChangeEditAddress} required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs float-left text-slate-300 font-semibold">
                            Pais
                        </label>
                        <div className="flex items-center mt-2 w-full bg-gray-800 border border-gray-700 h-12 rounded-lg overflow-hidden pl-6 gap-2 ">
                            <FaCity size={20} className="text-slate-100" />
                            <input type="text" name="country" placeholder="Pais"
                                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
                                value={editAddress.country} onChange={onChangeEditAddress} required />
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    <label className="block text-xs float-left text-slate-300 font-semibold">
                        Codigo Postal
                    </label>
                    <div className="flex items-center mt-2 w-full bg-gray-800 border border-gray-700 h-12 rounded-lg overflow-hidden pl-6 gap-2 ">
                        <FaMapLocationDot size={20} className="text-slate-100" />
                        <input type="text" name="zipCode" placeholder="Codigo Postal"
                            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none "
                            value={editAddress.zipCode} onChange={onChangeEditAddress} required />
                    </div>
                </div>
            </div>
        </MiModal>
    )
}
export default ModalAddress