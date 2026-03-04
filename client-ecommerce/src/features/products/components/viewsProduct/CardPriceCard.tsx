import { BiPackage, BiTag } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";
import type { Product } from "../../types/product.types";
import { BsTruck } from "react-icons/bs";

interface CardPriceCardProps {
    product: Product;
}

const CardPriceCard: React.FC<CardPriceCardProps> = ({ product }) => {
    return (
        <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                    <FaDollarSign className="text-[#00f0ff]" size={16} />
                    <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">
                        [SYS_PRICING_DATA]
                    </h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">[BASE_PRICE]</p>
                        <p className="text-white text-xl font-bold mt-1">CR_{product.price}</p>
                    </div>
                    {product.priceDiscount && (
                        <div>
                            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">[DISCOUNTED_PRICE]</p>
                            <p className="text-[#e4ff00] text-xl font-bold mt-1">CR_{Math.round(
                                product.price - (product.price * product.priceDiscount!) / 100
                            )}</p>
                            <p className="text-[10px] text-[#e4ff00] mt-1 font-bold uppercase tracking-widest">
                                [SAVINGS:_{product.priceDiscount}%]
                            </p>
                        </div>)}
                </div>
            </div>

            {/* Stock Card */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                    <BiPackage className="text-[#00f0ff]" size={16} />
                    <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">
                        [INVENTORY_STATUS]
                    </h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">[AVAILABLE_UNITS]</p>
                        <p className={`text-xl font-bold mt-1 ${product.stock > 10 ? "text-white" :
                            product.stock > 0 ? "text-[#e4ff00]" : "text-[#ff0055]"
                            }`}>
                            {product.stock}
                        </p>
                    </div>
                    {product.soldCount !== undefined && (
                        <div>
                            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">[UNITS_SOLD]</p>
                            <p className="text-white text-xl font-bold mt-1">{product.soldCount}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Category & Brand */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                    <BiTag className="text-[#00f0ff]" size={16} />
                    <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">
                        [CLASSIFICATION]
                    </h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">[CATEGORY_ID]</p>
                        <p className="text-white text-[10px] font-bold tracking-widest uppercase mt-1">{product.category.slug}</p>
                    </div>
                    <div>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">[MANUFACTURER]</p>
                        <p className="text-white text-[10px] font-bold tracking-widest uppercase mt-1">{product.brand}</p>
                    </div>
                    {product.sku && (
                        <div>
                            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">[SKU_REFERENCE]</p>
                            <p className="text-white text-[10px] font-bold tracking-widest uppercase mt-1">{product.sku}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Shipping */}
            {product.shipping && (
                <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                        <BsTruck className="text-[#00f0ff]" size={16} />
                        <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">
                            [LOGISTICS]
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border border-zinc-800 p-3">
                            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">[FREE_SHIPPING]</p>
                            <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border ${product.shipping.free
                                ? "border-[#e4ff00] bg-[#e4ff00]/10 text-[#e4ff00]"
                                : "border-zinc-500 bg-black text-zinc-500"
                                }`}>
                                {product.shipping.free ? "[TRUE]" : "[FALSE]"}
                            </span>
                        </div>
                        {!product.shipping.free && (
                            <div className="mt-4">
                                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">[SHIPPING_FEE]</p>
                                <p className="text-white text-lg font-bold mt-1">CR_{product.shipping.cost}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardPriceCard;