import { BiCreditCard, BiX } from "react-icons/bi";
import { CiCreditCard1, CiEdit, CiTrash } from "react-icons/ci";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
// Removed duplicate import
import { useDeletePaymentMutation, usePaymentMutation, useUpdatePaymentMutation } from "../hook/mutation/usePaymentMutation";
import type { PaymentInput } from "../types/payment.types";
import { useState } from "react";
import { AxiosError } from "axios";
import SweetAlertas from "../../../shared/ui/SweetAlertas";

interface CardMethodProps {
    cardData: PaymentInput;
    handleExpiryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCvvChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCardData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedMethod: string;
}

interface ValidationErrors {
    [key: string]: string[];
}

const CardMethod = ({
    cardData,
    handleExpiryChange,
    handleCardNumberChange,
    handleCvvChange,
    onChangeCardData,
    selectedMethod,
}: CardMethodProps) => {
    const paymentMutation = usePaymentMutation();
    const updatePaymentMutation = useUpdatePaymentMutation();
    const deletePaymentMutation = useDeletePaymentMutation();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [isEditing, setIsEditing] = useState<boolean>(!cardData.id); // Si ya tiene ID → vista, sino → edición

    const isEditMode = isEditing || !cardData.id;

    const getCardIcon = () => {
        if (!cardData.cardNumber) return <BiCreditCard size={24} className="text-slate-400" />;
        const firstDigit = cardData.cardNumber.replace(/\s/g, '')[0];
        if (firstDigit === '4') return <FaCcVisa size={32} className="text-blue-500" />;
        if (firstDigit === '5') return <FaCcMastercard size={32} className="text-orange-500" />;
        if (firstDigit === '3') return <FaCcAmex size={32} className="text-blue-400" />;
        return <BiCreditCard size={24} className="text-slate-400" />;
    };

    const getFieldsError = (fieldName: string): string | undefined => {
        return validationErrors[fieldName]?.[0];
    };

    const handleCardSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setValidationErrors({});
        setIsSubmitting(true);

        try {
            if (cardData.id) {
                // Actualizar tarjeta existente
                await updatePaymentMutation.mutateAsync({ id: cardData.id, payment: cardData });
            } else {
                // Crear nueva tarjeta
                await paymentMutation.mutateAsync(cardData);
            }

            // Después de éxito, pasar a modo vista si era nueva
            if (!cardData.id) {
                setIsEditing(false);
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.errors) {
                setValidationErrors(error.response.data.errors);
            } else {
                console.error("Error al procesar la tarjeta:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const Cancel = () => { };

    const ConfirmDeleteBlog = async (id: string) => {
        await deletePaymentMutation.mutateAsync(id);
    };

    const handleDelete = () => {
        SweetAlertas.OnDialogChoose({
            message: `Estas seguro de eliminar la tarjeta ${cardData.cardHolder}`,
            onConfirm: () => ConfirmDeleteBlog(cardData.id!),
            onCancel: Cancel,
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setValidationErrors({});
        // Aquí podrías resetear el formulario si tienes una función para eso
    };

    return (
        selectedMethod === "card" && (
            <div className="border border-zinc-800 bg-[#050505] p-6 relative mt-6">
                <div className="flex flex-row justify-between items-center mb-8">
                    <h2 className="text-[#00f0ff] text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] m-0 flex items-center gap-2">
                        <BiCreditCard size={18} />
                        [DETALLES_DE_LA_TARJETA]
                    </h2>

                    {cardData.id && (
                        <div className="flex flex-row gap-4">
                            {isEditMode ? (
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-4 py-2 border border-zinc-800 bg-black text-zinc-500 hover:text-[#ff0055] hover:border-[#ff0055] hover:bg-[#ff0055]/10 transition-all font-bold uppercase tracking-widest text-[10px]"
                                    aria-label="Cancelar"
                                >
                                    <BiX size={16} />
                                    [CANCELAR]
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 px-4 py-2 border border-zinc-800 bg-black text-zinc-500 hover:text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all font-bold uppercase tracking-widest text-[10px]"
                                        aria-label="Editar"
                                    >
                                        <CiEdit size={16} />
                                        [EDITAR]
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center gap-2 px-4 py-2 border border-zinc-800 bg-black text-zinc-500 hover:text-[#ff0055] hover:border-[#ff0055] hover:bg-[#ff0055]/10 transition-all font-bold uppercase tracking-widest text-[10px]"
                                        aria-label="Eliminar"
                                    >
                                        <CiTrash size={16} />
                                        [ELIMINAR]
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="mx-auto flip-card mb-8">
                    <div className="flip-card-inner relative">
                        <div className="flip-card-front">
                            <div className="bg-black border border-zinc-800 p-8 text-white relative overflow-hidden h-68 md:h-56 md:w-96 w-64 group">
                                {/* Neon Accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] opacity-50 group-hover:opacity-100 transition-opacity" />

                                {/* Background Grid */}
                                <div className="absolute inset-0 bg-[#00f0ff]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ backgroundImage: "linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)", backgroundSize: "20px 20px", backgroundPosition: "-1px -1px" }} />

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="w-12 h-10 border border-[#e4ff00]/50 bg-[#e4ff00]/10 flex items-center justify-center">
                                        <div className="w-8 h-6 border border-[#e4ff00]/30 grid grid-cols-3 grid-rows-2">
                                            {[...Array(6)].map((_, i) => <div key={i} className="border border-[#e4ff00]/20" />)}
                                        </div>
                                    </div>
                                    <div className="text-[#00f0ff] opacity-80">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="text-2xl font-mono tracking-[0.2em] mb-6 text-white drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] relative z-10">
                                    {cardData.cardNumber || "•••• •••• •••• ••••"}
                                </div>

                                <div className="flex justify-between items-end relative z-10">
                                    <div>
                                        <div className="text-[8px] font-mono uppercase tracking-widest text-[#00f0ff] mb-1">[CARD_HOLDER]</div>
                                        <div className="font-mono text-sm uppercase tracking-wide"> {cardData.cardHolder || "NOMBRE APELLIDO"}</div>
                                    </div>
                                    <div>
                                        <div className="text-[8px] font-mono uppercase tracking-widest text-[#00f0ff] mb-1">[EXPIRES]</div>
                                        <div className="font-mono text-sm tracking-wide">{cardData.cardExpiration || "MM/AA"}</div>
                                    </div>
                                    <div className="text-right">
                                        {getCardIcon()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flip-card-back absolute inset-0">
                            <div className="bg-black border border-zinc-800 text-white h-68 md:h-56 md:w-96 w-64 relative overflow-hidden group">
                                {/* Neon Accents */}
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff0055] opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff0055] opacity-50 group-hover:opacity-100 transition-opacity" />

                                <div className="bg-[#050505] border-y border-zinc-800 h-10 w-full mt-6 shadow-[0_0_10px_rgba(0,0,0,0.8)]"></div>

                                <div className="bg-zinc-900 border border-zinc-800 mx-6 mt-6 h-10 flex items-center px-4 justify-between">
                                    <div className="text-zinc-500 font-mono text-[10px] uppercase truncate max-w-[150px]">{cardData.cardHolder || "NOMBRE APELLIDO"}</div>
                                    <div className="bg-black border border-zinc-700 px-3 py-1 text-xs text-[#ff0055] font-mono drop-shadow-[0_0_5px_rgba(255,0,85,0.5)]">
                                        {cardData.cardCvv || "123"}
                                    </div>
                                </div>

                                <div className="px-6 mt-6 font-mono text-[8px] uppercase tracking-widest text-zinc-500">
                                    <p className="mb-1">PARA SERVICIO AL CLIENTE LLAME AL 1-800-SYS-911</p>
                                    <p>VER REVERSO PARA INFORMACIÓN IMPORTANTE DEL SISTEMA</p>
                                </div>
                                <div className="absolute bottom-4 right-6 font-mono text-[8px] uppercase tracking-widest text-[#ff0055] opacity-80">
                                    [FIRMA_DE_AUTORIZACIÓN_REQUERIDA]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario - solo editable en modo edición */}
                {(isEditMode || !cardData.id) && (
                    <div className="space-y-6 mt-8 border-t border-zinc-800 pt-8 relative">
                        <div>
                            <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                                [NUMERO_DE_TARJETA]
                            </label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={cardData.cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700"
                                maxLength={19}
                                disabled={isSubmitting}
                            />
                            {getFieldsError("cardNumber") && (
                                <p className="text-[#ff0055] text-[10px] font-mono uppercase tracking-widest mt-2">{getFieldsError("cardNumber")}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                                [NOMBRE_DEL_TITULAR_DE_LA_TARJETA]
                            </label>
                            <input
                                type="text"
                                name="cardHolder"
                                value={cardData.cardHolder}
                                onChange={onChangeCardData}
                                placeholder="NOMBRE APELLIDO"
                                className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700 uppercase"
                                disabled={isSubmitting}
                            />
                            {getFieldsError("cardHolder") && (
                                <p className="text-[#ff0055] text-[10px] font-mono uppercase tracking-widest mt-2">{getFieldsError("cardHolder")}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                                    [FECHA_DE_EXPIRACION]
                                </label>
                                <input
                                    type="text"
                                    name="cardExpiration"
                                    value={cardData.cardExpiration}
                                    onChange={handleExpiryChange}
                                    placeholder="MM/AA"
                                    className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700"
                                    maxLength={5}
                                    disabled={isSubmitting}
                                />
                                {getFieldsError("cardExpiration") && (
                                    <p className="text-[#ff0055] text-[10px] font-mono uppercase tracking-widest mt-2">{getFieldsError("cardExpiration")}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2 flex items-center gap-2">
                                    [CODIGO_CVV]
                                </label>
                                <input
                                    type="text"
                                    name="cardCvv"
                                    value={cardData.cardCvv}
                                    onChange={handleCvvChange}
                                    placeholder="123"
                                    className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700"
                                    maxLength={4}
                                    disabled={isSubmitting}
                                />
                                {getFieldsError("cardCvv") && (
                                    <p className="text-[#ff0055] text-[10px] font-mono uppercase tracking-widest mt-2">{getFieldsError("cardCvv")}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleCardSubmit}
                                disabled={isSubmitting}
                                className="flex items-center justify-center min-w-[200px] gap-2 px-6 py-3 border border-zinc-800 bg-black text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] transition-all font-bold uppercase tracking-widest text-xs"
                            >
                                {isSubmitting ? (
                                    <div className="w-4 h-4 border-2 border-[#00f0ff] border-t-transparent animate-spin"></div>
                                ) : (
                                    <>
                                        <CiCreditCard1 size={18} />
                                        {cardData.id ? "[ACTUALIZAR_REGISTRO]" : "[GUARDAR_REGISTRO]"}
                                    </>
                                )}
                            </button>

                            {cardData.id && (
                                <button
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-6 py-3 border border-zinc-800 bg-black text-zinc-500 hover:bg-[#ff0055]/10 hover:border-[#ff0055] hover:text-[#ff0055] transition-all font-bold uppercase tracking-widest text-xs"
                                >
                                    <BiX size={18} />
                                    [CANCELAR]
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Si ya existe y no está en edición, mostrar mensaje */}
                {!isEditMode && cardData.id && (
                    <div className="mt-6 border-t border-zinc-900 pt-6">
                        <p className="text-center text-zinc-500 font-mono text-[10px] uppercase tracking-widest border border-zinc-800 bg-black p-4">
                            [METODO_DE_TRANSACCION_VERIFICADO_Y_ALMACENADO_DE_FORMA_SEGURA]
                        </p>
                    </div>
                )}
            </div>
        )
    );
};

export default CardMethod;