import React, { useState } from "react";
import { BiHeart, BiPackage, BiStar, BiTrendingUp, BiX } from "react-icons/bi";
import { CiShare2, CiShoppingCart } from "react-icons/ci";

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

const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "AeroBlade Gaming Laptop",
      price: 1799.0,
      originalPrice: 1999.0,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      category: "Laptops",
      rating: 4.8,
      reviews: 234,
      inStock: true,
      discount: 10,
    },
    {
      id: 2,
      name: "Aura Wireless Headphones",
      price: 249.0,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Audio",
      rating: 4.6,
      reviews: 189,
      inStock: true,
    },
    {
      id: 3,
      name: "Quantum X Smartphone",
      price: 999.0,
      originalPrice: 1199.0,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      category: "Smartphones",
      rating: 4.9,
      reviews: 456,
      inStock: false,
      discount: 17,
    },
    {
      id: 4,
      name: "Chrono Smartwatch V2",
      price: 329.0,
      originalPrice: 379.0,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Smartwatches",
      rating: 4.5,
      reviews: 123,
      inStock: true,
      discount: 13,
    },
    {
      id: 5,
      name: "Vortex Gaming Console",
      price: 499.0,
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      category: "Gaming Consoles",
      rating: 4.7,
      reviews: 312,
      inStock: true,
    },
    {
      id: 6,
      name: "MatrixPad Pro Tablet",
      price: 649.0,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      category: "Tablets",
      rating: 4.4,
      reviews: 98,
      inStock: true,
    },
    {
      id: 7,
      name: "UltraSound Speaker Pro",
      price: 399.0,
      originalPrice: 499.0,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      category: "Audio",
      rating: 4.6,
      reviews: 167,
      inStock: true,
      discount: 20,
    },
    {
      id: 8,
      name: "ProFit Fitness Tracker",
      price: 179.0,
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
      category: "Wearables",
      rating: 4.3,
      reviews: 289,
      inStock: false,
    },
  ]);

  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const handleRemoveItem = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: number) => {
    console.log(`Added item ${id} to cart`);
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock);
    console.log(`Added ${inStockItems.length} items to cart`);
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const inStockCount = wishlistItems.filter((item) => item.inStock).length;
  const totalSavings = wishlistItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
                <BiHeart className="text-cyan-400 fill-cyan-400" size={36} />
                Mi Lista de Deseos
              </h1>
              <p className="text-slate-400">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "producto" : "productos"}{" "}
                guardados
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                <CiShare2 size={18} />
                Compartir Lista
              </button>
              <button
                onClick={handleAddAllToCart}
                className="bg-linear-to-r from-cyan-500 to-cyan-500 hover:from-cyan-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50 flex items-center gap-2 cursor-pointer group/btn"
              >
                <CiShoppingCart
                  size={18}
                  className="group-hover/btn:animate-bounce"
                />
                Agregar Todo al Carrito
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Valor Total</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    ${totalValue.toFixed(2)}
                  </p>
                </div>
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <BiTrendingUp className="text-cyan-400" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">
                    Productos Disponibles
                  </p>
                  <p className="text-2xl font-bold text-green-400">
                    {inStockCount}/{wishlistItems.length}
                  </p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <BiPackage className="text-green-400" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Ahorro Total</p>
                  <p className="text-2xl font-bold text-orange-400">
                    ${totalSavings.toFixed(2)}
                  </p>
                </div>
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <BiHeart
                    className="text-orange-400 fill-orange-400"
                    size={24}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-16 text-center backdrop-blur-sm">
            <BiHeart
              className="mx-auto mb-4 text-slate-600"
              size={64}
              strokeWidth={1}
            />
            <h3 className="text-2xl font-bold text-slate-300 mb-2">
              Tu lista de deseos está vacía
            </h3>
            <p className="text-slate-500 mb-6">
              Agrega productos que te gusten para encontrarlos fácilmente
              después
            </p>
            <button className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50">
              Explorar Productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-all relative"
              >
                {/* Discount Badge */}
                {item.discount && (
                  <div className="absolute top-3 left-3 bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
                    -{item.discount}%
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="absolute top-3 right-3 bg-slate-900/80 hover:bg-red-500 text-slate-300 hover:text-white p-2 rounded-lg transition-all z-10 backdrop-blur-sm"
                  title="Eliminar de favoritos"
                >
                  <BiX size={18} />
                </button>

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
                      <BiStar
                        size={14}
                        className="text-amber-400 fill-amber-400"
                      />
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
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.inStock}
                    className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center cursor-pointer group/btn gap-2 ${
                      item.inStock
                        ? "bg-linear-to-r from-cyan-500 to-cyan-500 hover:from-cyan-600 hover:to-cyan-600 text-white"
                        : "bg-slate-700 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <CiShoppingCart size={18} className="group-hover/btn:animate-bounce"/>
                    {item.inStock ? "Agregar al Carrito" : "No Disponible"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <BiX size={24} />
              </button>

              <div className="text-center mb-6">
                <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CiShare2 className="text-cyan-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  Compartir Lista de Deseos
                </h3>
                <p className="text-slate-400 text-sm">
                  Comparte tu lista con amigos y familia
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-3">
                  <span className="text-xl">📧</span>
                  Compartir por Email
                </button>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-3">
                  <span className="text-xl">💬</span>
                  Compartir por WhatsApp
                </button>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-3">
                  <span className="text-xl">🔗</span>
                  Copiar Enlace
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
