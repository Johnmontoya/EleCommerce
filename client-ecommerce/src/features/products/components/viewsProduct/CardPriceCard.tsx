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
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <FaDollarSign className="text-green-400" size={24} />
                    <h2 className="text-xl font-bold text-white">Precio</h2>
                </div>
                <div className="space-y-3">
                    <div>
                        <p className="text-slate-400 text-sm">Precio Regular</p>
                        <p className="text-3xl font-bold text-white">${product.price}</p>
                    </div>
                    {product.priceDiscount && (
                        <div>
                            <p className="text-slate-400 text-sm">Precio con Descuento</p>
                            <p className="text-2xl font-bold text-green-400">${Math.round(
                                product.price - (product.price * product.priceDiscount!) / 100
                            )}</p>
                            <p className="text-sm text-green-400 mt-1">
                                Ahorro: {product.priceDiscount}%
                            </p>
                        </div>)}
                </div>
            </div>

            {/* Stock Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <BiPackage className="text-cyan-400" size={24} />
                    <h2 className="text-xl font-bold text-white">Inventario</h2>
                </div>
                <div className="space-y-3">
                    <div>
                        <p className="text-slate-400 text-sm">Stock Disponible</p>
                        <p className={`text-3xl font-bold ${product.stock > 10 ? "text-green-400" :
                            product.stock > 0 ? "text-yellow-400" : "text-red-400"
                            }`}>
                            {product.stock}
                        </p>
                    </div>
                    {product.price !== undefined && (
                        <div>
                            <p className="text-slate-400 text-sm">Unidades Vendidas</p>
                            <p className="text-xl font-bold text-white">{product.price}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Category & Brand */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <BiTag className="text-purple-400" size={24} />
                    <h2 className="text-xl font-bold text-white">Categorización</h2>
                </div>
                <div className="space-y-3">
                    <div>
                        <p className="text-slate-400 text-sm">Categoría</p>
                        <p className="text-white font-medium">{product.category.slug}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Marca</p>
                        <p className="text-white font-medium">{product.brand}</p>
                    </div>
                    {product.sku && (
                        <div>
                            <p className="text-slate-400 text-sm">SKU</p>
                            <p className="text-white font-medium">{product.sku}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Shipping */}
            {product.shipping && (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <BsTruck className="text-blue-400" size={24} />
                        <h2 className="text-xl font-bold text-white">Envío</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-400">Envío Gratis</p>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.shipping.free
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                                }`}>
                                {product.shipping.free ? "Sí" : "No"}
                            </span>
                        </div>
                        {!product.shipping.free && (
                            <div>
                                <p className="text-slate-400 text-sm">Costo de Envío</p>
                                <p className="text-white font-medium">${product.shipping.cost}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardPriceCard;