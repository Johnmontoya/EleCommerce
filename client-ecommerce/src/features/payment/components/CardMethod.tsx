import { BiCreditCard, BiX } from "react-icons/bi";
import { CiCreditCard1, CiEdit, CiTrash } from "react-icons/ci";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import ButtonAction from "../../../shared/ui/ButtonAction";
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
            <div className="dash-search dark:dash-search border border-slate-600 rounded-2xl p-6">
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

                <div className="w-96 mx-auto flip-card">
                    <div className="flip-card-inner relative">
                        <div className="flip-card-front">
                            <div className="card-gradient-blue rounded-2xl p-8 text-white card-shadow relative overflow-hidden h-56 w-96">
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
                                    <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full"></div>
                                </div>

                                <div className="flex justify-between items-start mb-8">
                                    <div className="chip w-12 h-10 rounded-lg" />
                                    <div className="contactless">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="card-number text-2xl font-medium mb-6 tracking-wider">
                                    {cardData.cardNumber || "•••• •••• •••• ••••"}
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-xs opacity-80 mb-1">CARD HOLDER</div>
                                        <div className="font-medium"> {cardData.cardHolder || "NOMBRE APELLIDO"}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs opacity-80 mb-1">EXPIRES</div>
                                        <div className="font-medium">{cardData.cardExpiration || "MM/AA"}</div>
                                    </div>
                                    <div className="text-right">
                                        {getCardIcon()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flip-card-back absolute inset-0">
                            <div className="card-gradient-blue rounded-2xl text-white card-shadow h-56 w-96 relative">
                                <div className="magnetic-strip h-12 w-full mt-6"></div>

                                <div className="bg-white mx-6 mt-8 h-10 rounded flex items-center px-4">
                                    <div className="text-gray-600 text-sm italic">{cardData.cardHolder || "NOMBRE APELLIDO"}</div>
                                    <div className="ml-auto bg-gray-100 px-3 py-1 rounded text-xs text-gray-700 font-mono">
                                        {cardData.cardCvv || "123"}
                                    </div>
                                </div>

                                <div className="px-6 mt-4 text-xs">
                                    <p className="mb-2">For customer service call 1-800-VISA-911</p>
                                    <p>See reverse for important information</p>
                                </div>
                                <div className="absolute bottom-4 right-6 text-xs opacity-80">
                                    Valid only when signed
                                </div>
                            </div>
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