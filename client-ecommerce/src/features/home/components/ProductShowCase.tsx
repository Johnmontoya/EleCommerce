import { useNavigate } from "react-router-dom";
import { useGetShowcase } from "../hooks/useShowcase";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {
    Days: 0,
    Hrs: 0,
    Min: 0,
    Sec: 0,
  };

  if (difference > 0) {
    timeLeft = {
      Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
      Min: Math.floor((difference / 1000 / 60) % 60),
      Sec: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const ProductShowCase = () => {
  const navigate = useNavigate();
  const { data: showcase } = useGetShowcase();

  const product = showcase?.[0];

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(product?.promotionalData?.endDate || "2026-12-31T23:59:59")
  );

  useEffect(() => {
    if (!product) return;
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(product?.promotionalData?.endDate || "2026-12-31T23:59:59"));
    }, 1000);

    return () => clearTimeout(timer);
  }, [product, timeLeft]);

  if (!product) return null;

  return (
    <div className="w-full mx-auto my-16 bg-[#050505] border border-zinc-800 relative overflow-hidden group">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] z-0 pointer-events-none" />

      {/* Technical Background Accents */}
      <div className="absolute -left-20 top-0 w-64 h-full bg-[#e4ff00]/5 -skew-x-12 z-0" />
      <div className="absolute right-0 bottom-0 w-32 h-32 border-t border-l border-[#e4ff00]/20 z-0" />

      <div className="flex flex-col md:flex-row items-center relative z-10 w-full">
        {/* Text Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="inline-block border border-[#e4ff00] bg-[#e4ff00]/10 px-3 py-1 text-[#e4ff00] font-mono text-xs tracking-widest uppercase mb-6 w-fit">
            OFERTA RELÁMPAGO // TIEMPO LIMITADO
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white uppercase mb-6" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            {product.name}
          </h1>

          <p className="text-sm text-zinc-400 font-mono mb-8 border-l-2 border-zinc-800 pl-4 h-[60px] overflow-hidden">
            {product.description && product.description.length > 150
              ? `${product.description.slice(0, 150)}...`
              : product.description}
          </p>

          {/* Countdown Clock (Technical) */}
          <div className="flex gap-4 mb-8">
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-[#00f0ff] font-mono font-bold text-xs tracking-widest uppercase border-b border-zinc-800 pb-1 mb-2">T-MINUS</span>
            </div>
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center border border-zinc-800 bg-black min-w-[60px] p-2 hover:border-[#00f0ff] transition-colors">
                <span className="text-2xl font-mono font-bold text-white">
                  {value.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{unit}</span>
              </div>
            ))}
          </div>

          <button onClick={() => navigate(`/products/${product.slug}`)} className="bg-[#e4ff00] text-black px-8 py-4 font-bold tracking-[0.2em] font-mono text-xs uppercase hover:bg-white transition-colors w-fit flex items-center gap-3 group/btn">
            <span>COMPRAR AHORA</span>
            <FaArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative min-h-[400px] flex items-center justify-center p-8 bg-[#0a0a0a]">
          {/* Tech Target Border */}
          <div className="absolute inset-8 border border-zinc-800 z-0 flex items-center justify-center overflow-hidden">
            <div className="w-full h-[1px] bg-zinc-800 absolute" />
            <div className="w-[1px] h-full bg-zinc-800 absolute" />
          </div>

          {product.images?.[0]?.url && (
            <img
              src={product.promotionalData?.bannerImageUrl}
              alt={product.name}
              className="max-w-[80%] max-h-[350px] object-contain relative z-10 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 filter drop-shadow-[0_0_15px_rgba(228,255,0,0.1)] hover:drop-shadow-[0_0_20px_rgba(228,255,0,0.3)] mix-blend-screen"
            />
          )}

          {/* Technical Price Tag */}
          <div className="absolute bottom-8 right-8 bg-[#050505] border border-zinc-800 p-4 font-mono z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col items-end group-hover:border-[#00f0ff] transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500" />
            <div className="text-[10px] text-[#00f0ff] tracking-widest uppercase mb-1">PRECIO_FINAL //</div>
            {product.priceDiscount ? (
              <div className="flex flex-col items-end">
                <span className="line-through text-zinc-600 text-[10px] tracking-widest">${product.price}</span>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-[#e4ff00]">${Math.round(product.price - (product.price * product.priceDiscount) / 100)}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 pb-1">COP</span>
                </div>
              </div>
            ) : (
              <div className="flex items-end gap-1">
                <span className="text-3xl font-black text-white">${product.price}</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 pb-1">COP</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowCase;
