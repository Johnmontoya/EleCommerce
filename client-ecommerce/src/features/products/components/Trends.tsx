import { useNavigate } from "react-router-dom";
import { Assets, product } from "../../../assets/assets";

const Trends = () => {
  const navigate = useNavigate()

  return (
    <section className="w-full flex flex-col mx-auto justify-center items-center px-4 py-12">
      <h1 className="font-semibold text-xl text-slate-100 my-10 uppercase">
        PRINCIPALES TENDENCIAS
      </h1>
      <div className="max-w-7xl h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 m-auto">
        {product.slice(0, 5).map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/products/${item.slug}`)}
            className="relative flex w-60 flex-col object-cover overflow-hidden bg-slate-800/50 border-2 border-slate-700 hover:border-cyan-500/50 rounded-2xl p-0 backdrop-blur-sm shadow-xl space-y-4 cursor-pointer group"
          >
            <div className="mt-4 px-1 pb-5">
              <div className="w-80 h-64">
                <img src={`${Assets.computer}`} className="w-56 group-hover:scale-110 transition-transform duration-300" />
              </div>
             
                <h5 className="h-10 text-md text-center tracking-tight text-slate-100 font-bold">
                  {item.name}
                </h5>
             
              <div className="mt-3 mb-5 flex flex-col items-center justify-center">
                <p>
                  <span className="text-xl font-bold text-cyan-400 mr-1">
                    $
                    {Math.round(
                      item.price - (item.price * item.priceDiscount) / 100
                    )}
                  </span>
                  <span className="text-sm font-extralight text-slate-100 line-through">
                    ${item.price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trends;
