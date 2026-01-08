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
      <div key={product.id} className="w-full flex mx-auto">
        <div
          className="w-full rounded-2xl p-8 text-white relative h-full min-h-[270px] drop-shadow-lg/50 drop-shadow-black-500/50"
          style={{
            backgroundImage: `url(${product.promotionalData?.bannerImageUrl})`,
            backgroundSize: "cover",
          }}
        >
          <p className="text-amber-400 text-xl font-semibold mb-4">
            Descuento del {product.priceDiscount}% OFF
          </p>
          <p className="text-xs font-light mb-2 text-cyan-400">{product.brand}</p>
          <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
          <button onClick={() => navigate(`/products/${product.slug}`)} className="border-2 rounded-2xl border-slate-400/40 p-4 text-white text-sm font-medium flex items-center hover:scale-105 hover:bg-slate-500/20 transition-all cursor-pointer">
            <p>Comprar Ahora</p>
            <FaArrowRight size={14} className="ml-1" />
          </button>
          <div className="absolute p-2 rounded-xl bg-cyan-500 right-4 top-4 font-light text-5xl">
            <div>
              ${product.price}<span className="text-sm">cop</span>
            </div>
          </div>
        </div>
      </div>
    )))
};

export default Promotion;
