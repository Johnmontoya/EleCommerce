// pages/admin/ProductDetailPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../hook/queries/useProduct";
import { useDeleteProductMutation, useUpdateProductMutation } from "../../hook/mutation/useProductMutation";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import { BsEye, BsTrash2, BsTruck } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import { BiEdit, BiPackage, BiTag } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import ButtonAction from "../../../../shared/ui/ButtonAction";

const DashViewProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: product, isLoading } = useProduct(id!);
    const deleteProduct = useDeleteProductMutation();
    const updateProduct = useUpdateProductMutation();

    const handleDelete = async () => {
        if (window.confirm(`¿Eliminar "${product?.name}"?`)) {
            await deleteProduct.mutateAsync(id!);
            navigate("/dashboard/products");
        }
    };

    const handleTogglePublish = async () => {
        if (product) {
            await updateProduct.mutateAsync({
                id: product.id,
                data: { isPublished: !product.isPublished }
            });
        }
    };

    if (isLoading) return <LoadingFallback />;
    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">Producto no encontrado</p>
                    <button
                        onClick={() => navigate("/dashboard/products")}
                        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                    >
                        Volver a la lista
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="flex">
                {/** Sidebar */}
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    {/* Mobile Menu */}
                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h1 className="text-2xl lg:text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
                                        <BsEye className="text-cyan-400" size={36} />
                                        {product.name}
                                    </h1>
                                    <p className="text-slate-400 mt-1">ID: {product.id}</p>
                                </div>
                            </div>

                            <div className="flex lg:flex-row flex-col gap-3">
                                <ButtonAction
                                    variant="outline"
                                    text=""
                                    onClick={handleTogglePublish}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${product.isPublished
                                        ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                        }`}
                                >
                                    {product.isPublished ? <FiEyeOff size={18} /> : <BsEye size={18} />}
                                    {product.isPublished ? "Despublicar" : "Publicar"}
                                </ButtonAction>
                                <ButtonAction
                                    onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
                                    variant="primary"
                                    text="Editar"
                                >
                                    <BiEdit size={18} />
                                </ButtonAction>
                                <ButtonAction
                                    onClick={handleDelete}
                                    variant="danger"
                                    text="Eliminar"
                                >
                                    <BsTrash2 size={18} />
                                </ButtonAction>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Info */}
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

                            {/* Sidebar */}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashViewProductPage;