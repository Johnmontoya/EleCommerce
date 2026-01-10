import React from "react";
import { BiStar, BiX } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import type { WishlistItem } from "../../types/wish.types";
import { useWishlistDeleteMutation } from "../../hook/mutation/useWishlistMutation";
import { useCartAddMutation } from "../../../cart/hook/mutation/useCartMutation";

interface WishlistItemProps {
  wishlistItems: WishlistItem[] | undefined | null,
}

const ListWish: React.FC<WishlistItemProps> = ({ wishlistItems }) => {
  const deleteWishlistItem = useWishlistDeleteMutation();
  const useCartMutation = useCartAddMutation();

  const handleRemoveItem = async (id: string) => {
    await deleteWishlistItem.mutateAsync(id);
  };

  const handleAddToCart = async (item: any) => {
    await useCartMutation.mutateAsync({
      productId: item.productId,
      quantity: 1,
      name: item.productName,
      image: item.productImage,
      price: item.price!,
      discount: item.discount!,
      stock: item.stock!,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {wishlistItems?.map((item) => (
        <div
          key={item.id}
          className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-all relative"
        >

          {item.discount ? (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
              -{item.discount}%
            </div>
          ) : null}

          {/* Remove Button */}
          <ButtonAction
            onClick={() => handleRemoveItem(item.id)}
            className="absolute top-3 right-3 bg-slate-900/80 hover:bg-red-500 text-slate-300 hover:text-white p-2 rounded-lg transition-all z-10 backdrop-blur-sm"
            variant="outline"
            text=""
          >
            <BiX size={18} />
          </ButtonAction>

          {/* Image */}
          <div className="relative h-64 bg-slate-900/50 overflow-hidden">
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {!item && (
              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  Agotado
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-4">
            <div className="flex h-full flex-col gap-2">
              <p className="text-cyan-400 text-xs font-semibold mb-2 uppercase">
                {item.category}
              </p>
              <h3 className="h-14 text-slate-100 font-bold text-lg mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                {item.productName}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <BiStar size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-slate-300 text-sm font-semibold">
                    {item.rating}
                  </span>
                </div>
                <span className="text-slate-500 text-xs">
                  ({item.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex h-10 items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-cyan-400">
                  ${item.price}
                </span>
                {item.discount && (
                  <span className="text-slate-500 line-through text-sm">
                    ${item.total}
                  </span>
                )}
              </div>
            </div>

            <ButtonAction
              onClick={() => handleAddToCart(item)}
              text=""
              variant={item.stock ? "primary" : "secondary"}
              disabled={!item.stock}
              className="w-full h-12 flex justify-center"
            >
              <CiShoppingCart size={18} />
              {item.stock ? "Agregar al Carrito" : "No Disponible"}
            </ButtonAction>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListWish;
