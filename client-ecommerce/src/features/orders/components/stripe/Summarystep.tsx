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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Encabezado Técnico */}
            <div className="border-l-4 border-[#00f0ff] pl-3 mb-6">
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    INVENTORY_MANIFEST //
                </h2>
                <p className="text-zinc-500 text-xs font-mono tracking-widest mt-1 uppercase">
                    SYSTEM.VERIFY_ITEMS(AWAITING_CONFIRMATION)
                </p>
            </div>

            {/* Lista de items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#27272a transparent' }}>
                {items.map((item, index) => {
                    const itemTotal = item.price * item.quantity - (item.discount ?? 0);
                    const itemStock = stock[index] || 0;
                    const isUpdating = updatingItems.has(item.productId);

                    return (
                        <div
                            key={item.productId}
                            className="group relative flex gap-4 p-4 bg-[#050505] border border-zinc-800 hover:border-[#00f0ff]/50 transition-colors"
                        >
                            {/* Esquinas decorativas */}
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-500 group-hover:border-[#00f0ff] transition-colors" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-500 group-hover:border-[#00f0ff] transition-colors" />

                            {/* Imagen técnica */}
                            <div className="relative flex-shrink-0 w-24 h-24 border border-zinc-800 bg-[#0a0a0a] p-1">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                />
                                {/* Badge de cantidad estilo sensor */}
                                <div className="absolute -top-2 -right-2 bg-[#00f0ff] text-black text-[10px] font-bold px-1.5 py-0.5 tracking-wider border border-black shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                                    QTY.{item.quantity}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <p className="text-zinc-200 text-sm font-bold tracking-wide uppercase truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                        {item.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-zinc-500 text-xs font-mono">
                                            UNIT: {fmt(item.price)}
                                        </p>
                                        {item.discount && item.discount > 0 && (
                                            <span className="text-[9px] text-black bg-[#e4ff00] px-1 font-bold tracking-wider">
                                                -{item.discount}%
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Controles de cantidad estilo terminal */}
                                <div className="flex items-center gap-1 mt-3">
                                    <button
                                        onClick={() => handleDecrement(item.id!, item.quantity)}
                                        disabled={item.quantity <= 1 || isUpdating}
                                        className={`w-7 h-7 flex items-center justify-center border transition-all ${item.quantity <= 1 || isUpdating
                                            ? 'border-zinc-800 text-zinc-700 cursor-not-allowed bg-transparent'
                                            : 'border-zinc-600 text-zinc-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10'
                                            }`}
                                    >
                                        <RiSubtractFill size={14} />
                                    </button>

                                    <div className="w-10 h-7 flex items-center justify-center border border-zinc-800 bg-zinc-900/50 text-zinc-300 text-xs font-mono">
                                        {isUpdating ? '...' : item.quantity.toString().padStart(2, '0')}
                                    </div>

                                    <button
                                        onClick={() => handleIncrement(item.id!, item.quantity, itemStock)}
                                        disabled={item.quantity >= itemStock || isUpdating}
                                        className={`w-7 h-7 flex items-center justify-center border transition-all ${item.quantity >= itemStock || isUpdating
                                            ? 'border-zinc-800 text-zinc-700 cursor-not-allowed bg-transparent'
                                            : 'border-zinc-600 text-zinc-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10'
                                            }`}
                                    >
                                        <RiAddFill size={14} />
                                    </button>

                                    {item.quantity >= itemStock && (
                                        <span className="text-[9px] text-[#ff0055] ml-2 tracking-widest border border-[#ff0055]/30 px-1 bg-[#ff0055]/5">
                                            MAX_STOCK
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Total del item */}
                            <div className="text-right flex-shrink-0 flex flex-col justify-between items-end">
                                <p className="text-[#00f0ff] font-bold text-sm tracking-wider font-mono">
                                    {fmt(itemTotal)}
                                </p>
                                {item.discount && item.discount > 0 && (
                                    <p className="text-[9px] text-[#e4ff00] tracking-widest uppercase">
                                        SAVE:{fmt((item.price * item.quantity) * (item.discount / 100))}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desglose de costos - Estilo Ticket de Terminal */}
            <div className="bg-[#050505] border border-zinc-800 p-5 font-mono text-sm relative">
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-zinc-600" />
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-zinc-600" />

                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="text-zinc-500 tracking-wider">SUBTOTAL</span>
                        <div className="flex-1 border-b border-dashed border-zinc-800 mx-4 mb-2"></div>
                        <span className="text-zinc-300">{fmt(subtotal)}</span>
                    </div>
                    {tax > 0 && (
                        <div className="flex justify-between items-end">
                            <span className="text-zinc-500 tracking-wider">TAX_FEE (2%)</span>
                            <div className="flex-1 border-b border-dashed border-zinc-800 mx-4 mb-2"></div>
                            <span className="text-zinc-300">{fmt(tax)}</span>
                        </div>
                    )}
                    {discount > 0 && (
                        <div className="flex justify-between items-end">
                            <span className="text-zinc-500 tracking-wider">DISCOUNT</span>
                            <div className="flex-1 border-b border-dashed border-zinc-800 mx-4 mb-2"></div>
                            <span className="text-[#e4ff00]">- {fmt(discount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-end">
                        <span className="text-zinc-500 tracking-wider">LOGISTICS</span>
                        <div className="flex-1 border-b border-dashed border-zinc-800 mx-4 mb-2"></div>
                        <span className={shippingCost === 0 ? "text-[#00f0ff]" : "text-zinc-300"}>
                            {shippingCost === 0 ? "FREE_TIER" : fmt(shippingCost)}
                        </span>
                    </div>

                    <div className="h-[1px] bg-zinc-800 my-4 relative">
                        <div className="absolute -top-1 -left-1 w-2 h-2 border border-zinc-600 bg-black" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 border border-zinc-600 bg-black" />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <div className="flex flex-col">
                            <span className="text-white font-bold tracking-widest text-lg" style={{ fontFamily: "'Rajdhani', sans-serif" }}>TOTAL_AMOUNT</span>
                            <span className="text-[10px] text-zinc-600 uppercase">CURRENCY: MXN</span>
                        </div>
                        <span className="text-[#00f0ff] font-bold text-2xl tracking-wider">{fmt(total)}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full relative group overflow-hidden bg-white text-black font-bold uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-3 transition-all hover:bg-[#00f0ff] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={items.length === 0}
            >
                <span className="relative z-10">CONFIRM_INVENTORY // PROCEED</span>
                <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                {/* Tech scanline effect on hover */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 animate-[scan_2s_linear_infinite]" />
            </button>
        </div>
    );
}