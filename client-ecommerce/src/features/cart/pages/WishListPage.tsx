import React, { useState } from "react";
import { BiHeart, BiX } from "react-icons/bi";
import { CiLink, CiSearch, CiShare2 } from "react-icons/ci";
import BreadCrumbs from "../../../shared/ui/BreadCrumbs";
import ButtonAction from "../../../shared/ui/ButtonAction";
import { BsCartPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdWhatsapp } from "react-icons/md";
import ListWish from "../components/wishlist/ListWish";
import CardStats from "../components/wishlist/CardStats";

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
  const navigate = useNavigate();
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

  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock);
    console.log(`Added ${inStockItems.length} items to cart`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Breadcrumb */}
      <BreadCrumbs />

      <div className="max-w-7xl mx-auto px-4 pb-8">
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
            <div className="flex flex-col lg:flex-row gap-3">
              <ButtonAction
                onClick={() => setShowShareModal(true)}
                text="Compartir Lista"
                variant="secondary"
              >
                <CiShare2 size={18} />
              </ButtonAction>
              <ButtonAction
                onClick={handleAddAllToCart}
                text="Agregar Todo al carrito"
                variant="primary"
              >
                <BsCartPlus size={18} />
              </ButtonAction>
            </div>
          </div>

          {/* Stats Cards */}
          <CardStats wishlistItems={wishlistItems} />
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
            <ButtonAction
              onClick={() => navigate("/products")}
              text="Explorar Productos"
              variant="primary"
              className="flex mx-auto"
            >
              <CiSearch size={20} />
            </ButtonAction>
          </div>
        ) : (
          <ListWish wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-8 max-w-md w-full relative">
              <ButtonAction
                onClick={() => setShowShareModal(false)}
                variant="outline"
                text=""
                className="absolute top-4 right-4"
              >
                <BiX size={24} />
              </ButtonAction>

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
                <ButtonAction
                  text="Compartir por Email"
                  variant="secondary"
                  onClick={() => {}}
                  className="w-full flex justify-center"
                >
                  <MdOutlineEmail size={20} />
                </ButtonAction>
                <ButtonAction
                  text="Compartir por WhatsApp"
                  variant="secondary"
                  onClick={() => {}}
                  className="w-full flex justify-center"
                >
                  <MdWhatsapp size={20} />
                </ButtonAction>
                <ButtonAction
                  text="Copiar Enlace"
                  variant="secondary"
                  onClick={() => {}}
                  className="w-full flex justify-center"
                >
                  <CiLink size={20} />
                </ButtonAction>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
