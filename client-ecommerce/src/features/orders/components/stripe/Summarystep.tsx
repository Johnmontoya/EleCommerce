// src/features/checkout/components/SummaryStep.tsx
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import type { CartItem, CheckoutPricing } from "../../types/checkout.types";
import { useState } from "react";

const fmt = (n: number) =>
    "$" + n.toLocaleString("es-MX", { minimumFractionDigits: 2 });

interface SummaryStepProps {
    stock: number[]; // Array de stocks en el mismo orden que items
    items: CartItem[];
    pricing: CheckoutPricing;
    onNext: () => void;
    onUpdateQuantity?: (productId: string, newQuantity: number) => Promise<void>; // Función para actualizar cantidad
}

export function SummaryStep({ stock, items, pricing, onNext, onUpdateQuantity }: SummaryStepProps) {
    const { subtotal, tax, shippingCost, discount } = pricing;
    const total = subtotal + tax + shippingCost - discount;

    // Estado local para manejar la UI mientras se actualiza
    const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

    const handleIncrement = async (productId: string, currentQuantity: number, maxStock: number) => {
        if (currentQuantity < maxStock) {
            try {
                setUpdatingItems(prev => new Set(prev).add(productId));
                const newQuantity = currentQuantity + 1;
                await onUpdateQuantity?.(productId, newQuantity);
            } catch (error) {
                console.error("Error al incrementar:", error);
            } finally {
                setUpdatingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(productId);
                    return newSet;
                });
            }
        }
    };

    const handleDecrement = async (productId: string, currentQuantity: number) => {
        if (currentQuantity > 1) {
            try {
                setUpdatingItems(prev => new Set(prev).add(productId));
                const newQuantity = currentQuantity - 1;
                await onUpdateQuantity?.(productId, newQuantity);
            } catch (error) {
                console.error("Error al decrementar:", error);
            } finally {
                setUpdatingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(productId);
                    return newSet;
                });
            }
        }
    };

    return (
        <div className="space-y-5">
            {/* Encabezado */}
            <div>
                <h2 className="text-xl font-semibold text-white">Tu pedido</h2>
                <p className="text-slate-400 text-sm mt-0.5">
                    Revisa los productos antes de continuar
                </p>
            </div>

            {/* Lista de items */}
            <div className="grid grid-cols-2 gap-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item, index) => {
                    const itemTotal = item.price * item.quantity - (item.discount ?? 0);
                    const itemStock = stock[index] || 0;
                    const isUpdating = updatingItems.has(item.productId);

                    return (
                        <div
                            key={item.productId}
                            className="h-30 flex gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-colors"
                        >
                            {/* Imagen con badge de cantidad */}
                            <div className="relative flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg bg-slate-700"
                                />
                                {/* Badge de cantidad actual */}
                                <span className="absolute -top-2 -right-2 min-w-[1.5rem] h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center px-1.5">
                                    {item.quantity}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-slate-100 text-sm font-medium truncate">
                                    {item.name}
                                </p>
                                <p className="text-slate-500 text-xs mt-0.5">
                                    {fmt(item.price)} c/u
                                </p>

                                {/* Descuento si aplica */}
                                {item.discount && item.discount > 0 && (
                                    <span className="inline-block mt-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                        {item.discount}% descuento
                                    </span>
                                )}

                                {/* Controles de cantidad */}
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => handleDecrement(item.id!, item.quantity)}
                                        disabled={item.quantity <= 1 || isUpdating}
                                        className={`p-1 rounded-lg transition-colors ${item.quantity <= 1 || isUpdating
                                            ? 'text-slate-600 cursor-not-allowed'
                                            : 'text-cyan-500 hover:bg-slate-700'
                                            }`}
                                    >
                                        <RiSubtractFill size={16} />
                                    </button>

                                    <span className="text-slate-300 text-sm min-w-[1.5rem] text-center">
                                        {isUpdating ? '...' : item.quantity}
                                    </span>

                                    <button
                                        onClick={() => handleIncrement(item.id!, item.quantity, itemStock)}
                                        disabled={item.quantity >= itemStock || isUpdating}
                                        className={`p-1 rounded-lg transition-colors ${item.quantity >= itemStock || isUpdating
                                            ? 'text-slate-600 cursor-not-allowed'
                                            : 'text-cyan-500 hover:bg-slate-700'
                                            }`}
                                    >
                                        <RiAddFill size={16} />
                                    </button>

                                    {/* Indicador de stock máximo */}
                                    {item.quantity >= itemStock && (
                                        <span className="text-xs text-amber-400 ml-1">
                                            Stock máximo
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Total del item */}
                            <div className="text-right flex-shrink-0">
                                <p className="text-slate-100 font-semibold text-sm">
                                    {fmt(itemTotal)}
                                </p>
                                {item.discount && item.discount > 0 && (
                                    <p className="text-xs text-emerald-400/70">
                                        Ahorras {fmt((item.price * item.quantity) * (item.discount / 100))}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desglose de costos */}
            <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-4 space-y-2.5">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-slate-300">{fmt(subtotal)}</span>
                </div>
                {tax > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">IVA (2%)</span>
                        <span className="text-slate-300">{fmt(tax)}</span>
                    </div>
                )}
                {discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Descuento</span>
                        <span className="text-emerald-400">−{fmt(discount)}</span>
                    </div>
                )}
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Envío</span>
                    <span className={shippingCost === 0 ? "text-emerald-400" : "text-slate-300"}>
                        {shippingCost === 0 ? "Gratis" : fmt(shippingCost)}
                    </span>
                </div>
                <div className="h-px bg-slate-700" />
                <div className="flex justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-sky-400 font-bold text-lg">{fmt(total)}</span>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={items.length === 0}
            >
                Continuar con el envío
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}