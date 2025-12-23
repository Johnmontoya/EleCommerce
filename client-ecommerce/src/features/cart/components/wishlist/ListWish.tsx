import React from "react";
import { BiStar, BiX } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import ButtonAction from "../../../../shared/ui/ButtonAction";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
}

interface WishlistItemProps {
  wishlistItems: WishlistItem[],
  setWishlistItems: React.Dispatch<React.SetStateAction<any>>;
}

const ListWish: React.FC<WishlistItemProps> = ({ wishlistItems, setWishlistItems }) => {

  const handleRemoveItem = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: number) => {
    console.log(`Added item ${id} to cart`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {wishlistItems.map((item) => (
        <div
          key={item.id}
          className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-all relative"
        >
          {/* Discount Badge */}
          {item.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
              -{item.discount}%
            </div>
          )}

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
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {!item.inStock && (
              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  Agotado
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-cyan-400 text-xs font-semibold mb-2 uppercase">
              {item.category}
            </p>
            <h3 className="text-slate-100 font-bold text-lg mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {item.name}
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
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-cyan-400">
                ${item.price.toFixed(2)}
              </span>
              {item.originalPrice && (
                <span className="text-slate-500 line-through text-sm">
                  ${item.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <ButtonAction
              onClick={() => handleAddToCart(item.id)}
              text=""
              variant={item.inStock ? "primary" : "secondary"}
              disabled={!item.inStock}
              className="w-full flex justify-center"
            >
              <CiShoppingCart size={18} />
              {item.inStock ? "Agregar al Carrito" : "No Disponible"}
            </ButtonAction>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListWish;
