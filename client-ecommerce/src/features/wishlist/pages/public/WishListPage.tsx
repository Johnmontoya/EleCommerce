import React, { useState } from "react";
import { BiHeart, BiX } from "react-icons/bi";
import { CiLink, CiSearch, CiShare2 } from "react-icons/ci";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdWhatsapp } from "react-icons/md";
import ListWish from "../../components/wishlist/ListWish";
import CardStats from "../../components/wishlist/CardStats";
import { useWishlistItems } from "../../hook/queries/useWishList";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: wishlistItems, isLoading } = useWishlistItems();

  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  if (isLoading) return <LoadingFallback />;

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
                {wishlistItems?.length}{" "}
                {wishlistItems?.length === 1 ? "producto" : "productos"}{" "}
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
            </div>
          </div>

          {/* Stats Cards */}
          {<CardStats wishlistItems={wishlistItems} />}
        </div>

        {/* Wishlist Items */}
        {wishlistItems?.length === undefined ? (
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
          <ListWish wishlistItems={wishlistItems} />
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
                  onClick={() => { }}
                  className="w-full flex justify-center"
                >
                  <MdOutlineEmail size={20} />
                </ButtonAction>
                <ButtonAction
                  text="Compartir por WhatsApp"
                  variant="secondary"
                  onClick={() => { }}
                  className="w-full flex justify-center"
                >
                  <MdWhatsapp size={20} />
                </ButtonAction>
                <ButtonAction
                  text="Copiar Enlace"
                  variant="secondary"
                  onClick={() => { }}
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
