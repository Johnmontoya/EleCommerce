import { BiCreditCard, BiX } from "react-icons/bi";
import { CiCreditCard1, CiEdit, CiTrash } from "react-icons/ci";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import ButtonAction from "../../../shared/ui/ButtonAction";
import { useDeletePaymentMutation, usePaymentMutation, useUpdatePaymentMutation } from "../hook/mutation/usePaymentMutation";
import type { PaymentInput } from "../types/payment.types";
import { useState } from "react";
import { AxiosError } from "axios";

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

    const handleDelete = async () => {
        if (!cardData.id) return;

        if (confirm("¿Estás seguro de que deseas eliminar esta tarjeta?")) {
            try {
                await deletePaymentMutation.mutateAsync(cardData.id);
            } catch (error) {
                console.error("Error al eliminar la tarjeta:", error);
            }
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setValidationErrors({});
        // Aquí podrías resetear el formulario si tienes una función para eso
    };

    return (
        selectedMethod === "card" && (
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                        <BiCreditCard size={24} className="text-cyan-400" />
                        Detalles de la Tarjeta
                    </h2>

                    {cardData.id && (
                        <div className="flex flex-row gap-2">
                            {isEditMode ? (
                                <ButtonAction text="Cancelar" variant="secondary" onClick={handleCancel}><BiX size={20} /></ButtonAction>
                            ) : (
                                <>
                                    <ButtonAction text="" variant="edit" onClick={handleEdit}>
                                        <CiEdit size={20} />
                                    </ButtonAction>
                                    <ButtonAction text="" variant="delete" onClick={handleDelete}>
                                        <CiTrash size={20} />
                                    </ButtonAction>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Vista previa de la tarjeta */}
                <div className="w-96 mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl p-6 mb-6 shadow-xl">
                    <div className="flex justify-between items-start mb-8">
                        <div className="text-white text-sm font-semibold">BANK CARD</div>
                        {getCardIcon()}
                    </div>
                    <div className="text-white text-xl tracking-wider mb-4 font-mono">
                        {cardData.cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-cyan-100 text-xs mb-1">TITULAR</p>
                            <p className="text-white font-semibold uppercase">
                                {cardData.cardHolder || "NOMBRE APELLIDO"}
                            </p>
                        </div>
                        <div>
                            <p className="text-cyan-100 text-xs mb-1">EXPIRA</p>
                            <p className="text-white font-semibold">
                                {cardData.cardExpiration || "MM/AA"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Formulario - solo editable en modo edición */}
                {(isEditMode || !cardData.id) && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Número de Tarjeta
                            </label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={cardData.cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                maxLength={19}
                                disabled={isSubmitting}
                            />
                            {getFieldsError("cardNumber") && (
                                <p className="text-red-500 text-sm mt-1">{getFieldsError("cardNumber")}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Nombre del Titular
                            </label>
                            <input
                                type="text"
                                name="cardHolder"
                                value={cardData.cardHolder}
                                onChange={onChangeCardData}
                                placeholder="Juan Pérez"
                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors uppercase"
                                disabled={isSubmitting}
                            />
                            {getFieldsError("cardHolder") && (
                                <p className="text-red-500 text-sm mt-1">{getFieldsError("cardHolder")}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">
                                    Fecha de Expiración
                                </label>
                                <input
                                    type="text"
                                    name="cardExpiration"
                                    value={cardData.cardExpiration}
                                    onChange={handleExpiryChange}
                                    placeholder="MM/AA"
                                    className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                    maxLength={5}
                                    disabled={isSubmitting}
                                />
                                {getFieldsError("cardExpiration") && (
                                    <p className="text-red-500 text-sm mt-1">{getFieldsError("cardExpiration")}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                                    CVV
                                    <span className="text-xs text-slate-400">(Código de seguridad)</span>
                                </label>
                                <input
                                    type="text"
                                    name="cardCvv"
                                    value={cardData.cardCvv}
                                    onChange={handleCvvChange}
                                    placeholder="123"
                                    className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                    maxLength={4}
                                    disabled={isSubmitting}
                                />
                                {getFieldsError("cardCvv") && (
                                    <p className="text-red-500 text-sm mt-1">{getFieldsError("cardCvv")}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <ButtonAction
                                onClick={handleCardSubmit}
                                variant="primary"
                                text={cardData.id ? "Actualizar Tarjeta" : "Guardar Tarjeta"}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <CiCreditCard1 size={24} />
                                )}
                            </ButtonAction>

                            {cardData.id && (
                                <ButtonAction
                                    onClick={handleCancel}
                                    variant="secondary"
                                    text="Cancelar"
                                    disabled={isSubmitting}
                                >
                                    <BiX size={24} />
                                </ButtonAction>
                            )}
                        </div>
                    </div>
                )}

                {/* Si ya existe y no está en edición, mostrar mensaje */}
                {!isEditMode && cardData.id && (
                    <p className="text-center text-slate-400 mt-4">
                        Tarjeta guardada correctamente. Haz clic en editar para modificarla.
                    </p>
                )}
            </div>
        )
    );
};

export default CardMethod;