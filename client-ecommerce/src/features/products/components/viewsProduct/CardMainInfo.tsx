import type { Product } from "../../types/product.types";

interface CardMainInfoProps {
    product: Product;
}
const CardMainInfo: React.FC<CardMainInfoProps> = ({ product }) => {
    return (
        <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Imágenes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.images?.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`${product.name} ${idx + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Descripción</h2>
                <p className="text-slate-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Variantes</h2>
                    <div className="space-y-3">
                        {product.variants.map((variant, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <span className="text-slate-300 font-medium">{variant.name}:</span>
                                <div className="flex gap-2 flex-wrap">
                                    {variant.options?.map((option, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
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
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Atributos</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {product.attributes.map((attr, idx) => (
                            <div key={idx}>
                                <p className="text-slate-400 text-sm">{attr.name}</p>
                                <p className="text-white font-medium">{attr.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardMainInfo;