import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useBannerPromotional } from "../hooks/useShowcase";
import LoadingFallback from "../../../shared/ui/LoadingFallback";

const Promotion = () => {
  const navigate = useNavigate()

  const { data: promotional, isLoading } = useBannerPromotional();

  if (isLoading) return <LoadingFallback />

  return (
    promotional?.slice(0, 2).map((product) => (
      <div key={product.id} className="w-full flex mx-auto relative group">
        {/* Terminal frame corners */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#e4ff00] opacity-50 group-hover:opacity-100 transition-opacity z-20" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#e4ff00] opacity-50 group-hover:opacity-100 transition-opacity z-20" />

        <div
          className="w-full p-8 text-white relative h-full min-h-[270px] bg-[#050505] border border-zinc-800 overflow-hidden flex flex-col justify-center"
        >
          {/* Background Image with Heavy Filter */}
          <div
            className="absolute inset-0 z-0 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-700 scale-105 group-hover:scale-100"
            style={{
              backgroundImage: `url(${product.promotionalData?.bannerImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Scanline Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px] z-0" />

          <div className="relative z-10 w-2/3">
            <p className="text-[#e4ff00] text-xs font-mono tracking-widest uppercase mb-4 bg-black/50 w-fit px-2 py-1 border border-[#e4ff00]/30">
              DESCUENTO_AUTORIZADO // {product.priceDiscount}% OFF
            </p>
            <p className="text-xs font-bold tracking-[0.2em] mb-1 text-[#00f0ff] uppercase">{product.brand}</p>
            <h3 className="text-3xl font-black mb-6 uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{product.name}</h3>

            <button
              onClick={() => navigate(`/products/${product.slug}`)}
              className="border border-[#00f0ff] bg-black/50 text-[#00f0ff] px-6 py-3 text-xs font-bold tracking-widest uppercase flex items-center hover:bg-[#00f0ff] hover:text-black transition-all cursor-pointer w-fit"
            >
              <span>COMPRAR AHORA</span>
              <FaArrowRight size={12} className="ml-3" />
            </button>
          </div>

          <div className="absolute p-3 bg-black border border-zinc-700 bottom-8 right-8 font-mono text-2xl font-bold flex flex-col items-end shadow-2xl z-10 group-hover:border-[#e4ff00] transition-colors">
            <span className="text-[10px] text-zinc-500 tracking-widest uppercase mb-1">PRECIO_FINAL</span>
            <div className="text-white">
              ${product.price}<span className="text-xs text-zinc-400 ml-1">COP</span>
            </div>
          </div>
        </div>
      </div>
    )))
};

export default Promotion;
