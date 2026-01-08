import { useNavigate } from "react-router-dom";
import { useGetShowcase } from "../hooks/useShowcase";
import Countdown from "../../../shared/ui/Countdown";

const ProductShowCase = () => {
  const navigate = useNavigate()
  const { data: showcase } = useGetShowcase();

  return (
    <>
      <section className="w-full mx-auto z-10 bg-slate-800">
        <div className="absolute top-380 right-30 w-28 h-28 bg-cyan-500/30 rounded-full filter blur-3xl animate-float2"></div>
        <div className="flex drop-shadow-lg/50 drop-shadow-black-500/50">
          {showcase?.slice(0, 1).map((item, idx) => (
            <div key={idx} className={`w-full h-fit text-center`}>
              <div className="w-full flex flex-row justify-between relative">
                <div className="w-full h-full flex flex-col gap-4 z-20 m-auto py-2 justify-center items-center">
                  <div className="relative">
                    <div className="flex items-center w-32 md:w-40 h-10 md:h-14 p-4 text-sm md:text-xl rounded-lg font-bold bg-linear-to-b from-amber-400 from-10% via-amber-400 via-30% to-yellow-400 to-90% text-slate-100 uppercase">
                      Apresurate!
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-4xl text-slate-100 font-bold">Por hoy {item.priceDiscount}% Descuento</h1>
                  <section className="w-full">
                    <div className="w-full flex justify-center mx-auto">
                      <div className="flex flex-row px-2 py-0 md:py-4 gap-2 dark:text-white">

                        <Countdown targetDate="2026-12-31T23:59:59" />
                      </div>
                    </div>
                  </section>
                  <div className="h-full flex justify-center items-end">
                    <a
                      href="#"
                      onClick={() => navigate(`/products/${item.slug}`)}
                      className="flex items-center border border-cyan-400 justify-center w-32 h-12 rounded-2xl text-slate-100 transition-all duration-300 hover:scale-120 cursor-pointer"
                    >
                      <span className="font-semibold">Comprar Ahora</span>
                    </a>
                  </div>
                </div>
                <div className="w-full absolute md:relative z-10">
                  <img src={item?.promotionalData?.bannerImageUrl} className="w-full h-[348px] md:h-full mask-alpha mask-l-from-black mask-l-from-50% mask-l-to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductShowCase;
