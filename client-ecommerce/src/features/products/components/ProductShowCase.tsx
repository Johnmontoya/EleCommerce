import { useNavigate } from "react-router-dom";
import { product } from "../../../assets/assets";

const ProductShowCase = () => {
  const navigate = useNavigate()

  return (
    <>
      <section className="w-full mx-auto z-10 bg-slate-800">
        <div className="absolute top-380 right-30 w-28 h-28 bg-cyan-500/30 rounded-full filter blur-3xl animate-float2"></div>
        <div className="flex drop-shadow-lg/50 drop-shadow-black-500/50">
          {product.slice(0, 1).map((item, idx) => (
            <div key={idx} className={`w-full h-fit text-center`}>
              <div className="w-full flex flex-row justify-between relative">
                <div className="w-full h-full flex flex-col gap-4 z-20 m-auto py-2 justify-center items-center">
                  <div className="relative">
                    <div className="flex items-center w-32 md:w-40 h-10 md:h-14 p-4 text-sm md:text-xl rounded-lg font-bold bg-linear-to-b from-amber-400 from-10% via-amber-400 via-30% to-yellow-400 to-90% text-slate-100 uppercase">
                      Apresurate!
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-4xl text-slate-100 font-bold">Por hoy 25% Descuento</h1>
                  <section className="w-full">
                    <div className="w-full flex justify-center mx-auto">
                      <div className="flex flex-row px-2 py-0 md:py-4 gap-2 dark:text-white">                        
                        <div className="relative w-32 h-40 bg-slate-100/20 border-2 border-cyan-400 rounded-xl py-6 px-6 text-center flex flex-col items-center">
                          <h1 className="relative z-10 text-7xl text-cyan-500 md:text-7xl font-semibold">12</h1>                          
                          <span>Horas</span>
                        </div>
                        <div className="relative w-32 h-40 bg-slate-100/20  border-2 border-cyan-400 rounded-xl py-6 px-6 text-center flex flex-col items-center">
                          <h1 className="relative z-10 text-7xl text-cyan-500 md:text-7xl font-semibold">21</h1>                          
                          <span>Minutos</span>
                        </div>
                        <div className="relative w-32 h-40 bg-slate-100/20  border-2 border-cyan-400 rounded-xl py-6 px-6 text-center flex flex-col items-center">
                          <h1 className="relative z-10 text-7xl text-cyan-500 md:text-7xl font-semibold">35</h1>                          
                          <span>Segundos</span>
                        </div>
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
                  <img src={item.images[0]} className="w-full h-[348px] md:h-full mask-alpha mask-l-from-black mask-l-from-50% mask-l-to-transparent" />
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
