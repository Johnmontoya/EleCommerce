import React, { useState } from "react";
import { BiHeart, BiX } from "react-icons/bi";
import { CiLink, CiSearch, CiShare2 } from "react-icons/ci";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
// Removed ButtonAction import
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
    <div className="min-h-screen bg-[#020202] text-zinc-300">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4">
        <BreadCrumbs />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#00f0ff] mb-2 flex items-center gap-3 font-mono uppercase tracking-widest">
                <BiHeart className="text-[#ff0055]" size={36} />
                [LISTA_DE_DESEOS]
              </h1>
              <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase ml-12">
                {wishlistItems?.length}{" "}
                {wishlistItems?.length === 1 ? "UNIDAD" : "UNIDADES"}{" "}
                ALMACENADAS EN MEMORIA
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 border border-zinc-800 bg-[#050505] text-zinc-400 px-4 py-2 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all font-mono text-xs uppercase tracking-widest"
              >
                <CiShare2 size={18} />
                <span className="hidden md:flex">[COMPARTIR_DATOS]</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          {<CardStats wishlistItems={wishlistItems} />}
        </div>

        {/* Wishlist Items */}
        {wishlistItems?.length === undefined ? (
          <div className="border border-zinc-800 bg-[#050505] p-16 text-center relative overflow-hidden group">
            {/* Neon Accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff0055] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff0055] opacity-50"></div>

            <BiHeart
              className="mx-auto mb-6 text-zinc-800"
              size={64}
              strokeWidth={1}
            />
            <h3 className="text-xl font-bold text-[#ff0055] mb-2 font-mono uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,0,85,0.5)]">
              [WARNING_DEL_SISTEMA: NO_SE_ENCONTRARON_REGISTROS]
            </h3>
            <p className="text-zinc-500 mb-8 font-mono text-xs uppercase tracking-widest max-w-md mx-auto">
              AGREGUE ENTIDADES AL ALMACENAMIENTO DE LA LISTA DE DESEOS PARA RECUPERARLAS MÁS TARDE.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 border border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] px-6 py-3 hover:bg-[#00f0ff]/30 transition-all font-mono text-sm uppercase tracking-widest mx-auto shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <CiSearch size={20} />
              [INICIAR_EXPLORACIÓN]
            </button>
          </div>
        ) : (
          <ListWish wishlistItems={wishlistItems} />
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#050505] border border-[#00f0ff] p-8 max-w-md w-full relative shadow-[0_0_30px_rgba(0,240,255,0.15)]">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff]"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff]"></div>

              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-[#ff0055] transition-colors"
                aria-label="Cerrar"
              >
                <BiX size={24} />
              </button>

              <div className="text-center mb-8">
                <div className="border border-[#00f0ff]/30 bg-[#00f0ff]/10 w-16 h-16 flex items-center justify-center mx-auto mb-4 relative">
                  <div className="absolute inset-0 border border-[#00f0ff]/20 animate-ping opacity-20"></div>
                  <CiShare2 className="text-[#00f0ff]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#00f0ff] mb-2 font-mono uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
                  [PROTOCOLO_DE_DISTRIBUCIÓN_DE_DATOS]
                </h3>
                <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
                  DISTRIBUIR ACCESO A LA LISTA
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => { }}
                  className="w-full flex items-center justify-center gap-3 border border-zinc-800 bg-[#0a0a0a] text-zinc-400 p-3 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all font-mono text-xs uppercase tracking-widest"
                >
                  <MdOutlineEmail size={18} />
                  [TRANSMITIR_VIA_CORREO]
                </button>
                <button
                  onClick={() => { }}
                  className="w-full flex items-center justify-center gap-3 border border-zinc-800 bg-[#0a0a0a] text-zinc-400 p-3 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all font-mono text-xs uppercase tracking-widest"
                >
                  <MdWhatsapp size={18} />
                  [TRANSMITIR_VIA_WHATSAPP]
                </button>
                <button
                  onClick={() => { }}
                  className="w-full flex items-center justify-center gap-3 border border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff] p-3 hover:bg-[#00f0ff]/30 transition-all font-mono text-xs uppercase tracking-widest"
                >
                  <CiLink size={18} />
                  [COPIAR_ENLACE_DEL_SISTEMA]
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
