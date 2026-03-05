import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import TabsSection from "../../components/detailsProduct/TabsSection";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import { useProductBySlug } from "../../hook/queries/useProduct";
import { useParams } from "react-router-dom";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import { useCartAddMutation } from "../../../cart/hook/mutation/useCartMutation";
import { BiHeart } from "react-icons/bi";
import { useWishlistAddMutation } from "../../../wishlist/hook/mutation/useWishlistMutation";
import type { Product } from "../../types/product.types";

const DetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const useCartMutation = useCartAddMutation();
  const addWishlistItem = useWishlistAddMutation();
  const { data: product, isLoading, error } = useProductBySlug(slug!);
  const [thumbnail, setThumbnail] = useState<string>();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Use the first image as default thumbnail if no thumbnail is selected
  const activeThumbnail = thumbnail || (product?.images && product.images.length > 0 ? product.images[0].url : undefined);

  const handleAddToCart = async () => {
    if (!product) return;
    await useCartMutation.mutateAsync({
      productId: product.id,
      quantity: quantity,
      name: product.name,
      image: (product.images && product.images[0]?.url) || "",
      price: product.price,
      discount: product.priceDiscount || 0,
      stock: product.stock,
    });
  };

  const handleAddToWishlist = async (item: Product) => {
    await addWishlistItem.mutateAsync({
      productId: item.id,
      productName: item.name,
      productImage: (item.images && item.images[0]?.url) || "",
      price: item.price,
      discount: item.priceDiscount || 0,
      category: item.slug,
      stock: item.stock,
      reviews: item.reviewsCount || 0,
      rating: item.rating || 0,
      total: item.price - (item.price * (item.priceDiscount || 0)) / 100
    });
  };

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="min-h-screen bg-[#020202] relative font-mono text-white">
      {/* Elemento decorativo de fondo */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto relative z-10">
        <BreadCrumbs />
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          <BiHeart size={32}
            onClick={() => product && handleAddToWishlist(product)}
            className="absolute top-0 right-0 z-50 text-zinc-500 hover:text-[#ff0055] transition-colors cursor-pointer bg-black/50 p-1.5 border border-transparent hover:border-[#ff0055]" />
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4 lg:w-1/2">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible custom-scrollbar pb-2 md:pb-0">
              {product?.images!.map((image: { url: string }, index: number) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image.url)}
                  className={`relative w-20 h-20 overflow-hidden cursor-pointer transition-all border ${activeThumbnail === image.url
                    ? "border-[#00f0ff] opacity-100"
                    : "border-zinc-800 opacity-60 hover:opacity-100 hover:border-[#00f0ff]/50"
                    }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                  {activeThumbnail === image.url && (
                    <div className="absolute inset-0 bg-[#00f0ff]/10 pointer-events-none" />
                  )}
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full aspect-square md:w-[480px] md:h-[480px] flex-1 border border-zinc-800 bg-[#050505] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] opacity-50 z-20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] opacity-50 z-20" />

              {/* Scanline subtle */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.03)_50%)] bg-[length:100%_4px] z-10 pointer-events-none" />

              <img
                src={activeThumbnail}
                alt="Selected product"
                className="w-full h-full object-contain relative z-0 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col pt-2">
            <h1 className="text-3xl sm:text-4xl text-white font-bold mb-4 uppercase tracking-widest leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {product?.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              <span className="text-[#00f0ff] text-[10px] uppercase tracking-widest bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-2 py-0.5 mr-2">
                CALIFICACION_DEL_SISTEMA
              </span>
              {Array(5)
                .fill("")
                .map((_, i: number) => (
                  <FaStar
                    key={i}
                    size={14}
                    className={
                      (product?.rating || 0) > i
                        ? "text-[#e4ff00]"
                        : "text-zinc-700"
                    }
                  />
                ))}
              <p className="text-[10px] ml-2 text-zinc-400 font-bold tracking-widest">
                [ {product?.rating}.0 ]
              </p>
            </div>

            {/* Price section */}
            <div className="mb-8 border border-zinc-800 bg-[#050505] p-6 relative">
              <div className="absolute top-0 right-0 px-2 py-1 bg-black border-l border-b border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-widest">
                DATOS_FINANCIEROS //
              </div>

              <div className="flex flex-col gap-1 mt-2">
                {product?.priceDiscount ? (
                  <div className="flex items-center gap-3">
                    <p className="text-zinc-500 line-through text-xs font-mono uppercase tracking-widest">
                      CR_{product?.price}
                    </p>
                    <div className="bg-[#e4ff00] text-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                      -{product?.priceDiscount}%
                    </div>
                  </div>
                ) : null}

                <p className="text-4xl font-bold text-[#00f0ff] font-mono tracking-wider mt-1">
                  CR_{Math.round(
                    (product?.price || 0) - ((product?.price || 0) * (product?.priceDiscount || 0)) / 100
                  )}
                </p>

                <span className="text-zinc-600 text-[10px] uppercase tracking-widest mt-2 border-t border-zinc-800 border-dashed pt-2 inline-block">
                  [IMPUESTOS_INCLUIDOS]
                </span>
              </div>
            </div>

            {/* About the product - placeholder layout for future use if description exists in product object otherwise leave empty spaces */}
            <div className="mb-8">
              <h3 className="text-[#e4ff00] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#e4ff00] animate-pulse"></span>
                ESPECIFICACIONES_DEL_PRODUCTO //
              </h3>
              <div className="space-y-2 text-zinc-400 text-sm border-l-2 border-zinc-800 pl-4">
                <p className="font-mono text-xs uppercase tracking-widest text-[#00f0ff] mb-1">NO_HAY_ESPECIFICACIONES</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-auto border-t border-zinc-800 pt-8">
              {/* Quantity Selector */}
              <div className="flex flex-col gap-2">
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">CANTIDAD_A_SELECCIONAR</span>
                <div className="w-32 h-12 border border-zinc-600 bg-black flex justify-between items-center group">
                  <button
                    onClick={handleDecrement}
                    className="w-10 h-full flex items-center justify-center text-zinc-400 hover:text-[#00f0ff] hover:bg-zinc-900 border-r border-zinc-800 transition-colors"
                  >
                    <RiSubtractFill size={16} />
                  </button>
                  <span className="flex-1 text-center text-white text-sm font-bold font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-10 h-full flex items-center justify-center text-zinc-400 hover:text-[#00f0ff] hover:bg-zinc-900 border-l border-zinc-800 transition-colors"
                  >
                    <IoIosAdd size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-1 flex-col sm:flex-row gap-4 mt-6 sm:mt-0 items-end">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff] hover:text-black transition-all font-mono text-[10px] font-bold tracking-[0.2em] uppercase w-full"
                >
                  <BsCartPlus size={16} />
                  [AGREGAR_AL_CARRITO]
                </button>
                <button
                  onClick={() => { }}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#00f0ff] text-black border border-[#00f0ff] hover:bg-black hover:text-[#00f0ff] transition-all font-mono text-[10px] font-bold tracking-[0.2em] uppercase w-full"
                >
                  <BsCartCheck size={16} />
                  [EJECUTAR_COMPRA]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <TabsSection product={product} />
    </div>
  );
};

export default DetailsPage;
