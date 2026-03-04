import type { Product } from "../../types/product.types";

interface CardMainInfoProps {
    product: Product;
}
const CardMainInfo: React.FC<CardMainInfoProps> = ({ product }) => {
    return (
        <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                    <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
                    <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">
                        [PRODUCT_IMAGES]
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.images?.map((img, idx) => (
                        <div key={idx} className="relative group border border-zinc-800 hover:border-[#00f0ff] transition-colors p-1 bg-black">
                            <img
                                src={img.url}
                                alt={`${product.name} ${idx + 1}`}
                                className="w-full h-48 object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all rounded-none"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                    <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
                    <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">
                        [SYSTEM_DESCRIPTION]
                    </h2>
                </div>
                <p className="text-zinc-400 text-xs tracking-wider leading-relaxed bg-black border border-zinc-900 p-4">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
                <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
                        <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">
                            [PRODUCT_VARIANTS]
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {product.variants.map((variant, idx) => (
                            <div key={idx} className="flex flex-col gap-2 border border-zinc-900 bg-black p-4">
                                <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">[{variant.name}]</span>
                                <div className="flex gap-2 flex-wrap mt-1">
                                    {variant.options?.map((option, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[10px] uppercase font-bold tracking-widest"
                                        >
                                            {option}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Attributes */}
            {product.attributes && product.attributes.length > 0 && (
                <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
                        <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase">
                            [ATTRIBUTES_MATRIX]
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.attributes.map((attr, idx) => (
                            <div key={idx} className="border border-zinc-800 bg-black p-3 group hover:border-[#00f0ff] transition-colors relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#00f0ff]/20 group-hover:bg-[#00f0ff] transition-all" />
                                <div className="ml-2">
                                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-1">[{attr.name}]</p>
                                    <p className="text-white font-bold uppercase text-[10px] tracking-widest truncate" title={attr.value}>{attr.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardMainInfo;