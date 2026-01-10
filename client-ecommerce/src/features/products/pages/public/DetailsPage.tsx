import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import ButtonAction from "../../../../shared/ui/ButtonAction";
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
    product?.stock!
    if (quantity < product?.stock!) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    // Solo actualiza si el producto está cargado y tiene imágenes
    if (product && product.images && product.images.length > 0) {
      setThumbnail(product.images[0]);
    }
  }, [product]);

  const handleAddToCart = async () => {
    await useCartMutation.mutateAsync({
      productId: product?.id!,
      quantity: quantity,
      name: product?.name!,
      image: product?.images![0]!,
      price: product?.price!,
      discount: product?.priceDiscount!,
      stock: product?.stock!,
    });
  };

  const handleAddToWishlist = async (item: Product) => {
    await addWishlistItem.mutateAsync({
      productId: item.id,
      productName: item.name,
      productImage: item.images![0],
      price: item.price,
      discount: item.priceDiscount!,
      category: item.slug,
      stock: item.stock,
      reviews: item?.reviewsCount!,
      rating: item?.rating!,
      total: item.price - (item.price * item.priceDiscount!) / 100
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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Breadcrumb */}
      <BreadCrumbs />

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto w-full px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          <BiHeart size={36}
            onClick={() => handleAddToWishlist(product)}
            className="absolute top-3 right-3 z-50 text-slate-300 hover:text-cyan-500 hover:bg-slate-700 rounded-full p-1 cursor-pointer" />
          {/* Image Gallery */}
          <div className="flex gap-4 lg:w-1/2">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product?.images!.map((image: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`border-2 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${thumbnail === image
                    ? "border-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "border-slate-600 hover:border-slate-400"
                    }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-[480px] h-[480px] flex-1 border-2 border-slate-600 rounded-2xl overflow-hidden bg-slate-800/50">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl text-slate-100 font-bold mb-2">
              {product?.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {Array(5)
                .fill("")
                .map((_, i: number) => (
                  <FaStar
                    key={i}
                    size={18}
                    className={
                      product?.rating! > i
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-500"
                    }
                  />
                ))}
              <p className="text-base ml-2 text-slate-300">
                ({product?.rating}.0)
              </p>
            </div>

            {/* Price */}
            <div className="mb-8 bg-slate-800/50 p-4 rounded-xl">
              <p className="text-slate-400 line-through text-lg">
                MRP: ${product?.price}
              </p>
              <p className="text-3xl font-bold text-cyan-400">
                {Math.round(
                  product?.price - (product?.price * product?.priceDiscount!) / 100
                )}
              </p>
              <span className="text-slate-500 text-sm mr-1">
                (Incluye todos los impuestos)
              </span>
              <div className="mt-2 inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                Ahorra {product?.priceDiscount}%
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-lg text-slate-200 font-semibold mb-3">
                Acerca del Producto
              </p>
              <ul className="space-y-2 text-slate-400">

              </ul>
            </div>

            <div className="w-44 p-2 my-9 rounded-[170px] border border-cyan-500 justify-around items-center flex">
              <RiSubtractFill size={20} className="cursor-pointer text-cyan-500" onClick={handleDecrement} />
              <span className="w-10 text-center text-cyan-500 text-base font-normal leading-normal">
                {quantity}
              </span>
              <IoIosAdd size={20} className="cursor-pointer text-cyan-500" onClick={handleIncrement} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonAction onClick={handleAddToCart} children={<BsCartPlus size={18} />} text={"Agregar al carrito"} variant="secondary" />
              <ButtonAction onClick={() => { }} children={<BsCartCheck size={18} />} text={"Comprar"} variant="primary" />
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
