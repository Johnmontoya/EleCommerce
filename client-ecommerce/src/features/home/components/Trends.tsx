import { useNavigate } from "react-router-dom";
import { useGetTrends } from "../hooks/useShowcase";
import { BiStar } from "react-icons/bi";

const Trends = () => {
  const navigate = useNavigate()

  const { data: trends } = useGetTrends()

  return (
    <section className="w-full flex flex-col mx-auto justify-center items-center px-4 py-12">
      <h1 className="font-semibold text-xl text-slate-100 my-10 uppercase">
        PRINCIPALES TENDENCIAS
      </h1>
      <div className="max-w-7xl h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 m-auto">
        {trends?.slice(0, 5).map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/products/${item.slug}`)}
            className="relative flex w-60 flex-col object-cover overflow-hidden rounded-2xl bg-slate-800/50 border-2 border-slate-700 hover:border-cyan-500/50 drop-shadow-lg/20 drop-shadow-black-500/20 cursor-pointer group"
          >
            {item.priceDiscount ? (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
                -{item.priceDiscount}%
              </div>
            ) : null}
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col justify-between p-4">

              <p className="h-4 text-cyan-400 text-xs font-semibold mb-2 uppercase">
                {item.category.slug}
              </p>
              <h3 className="h-16 text-slate-100 font-bold text-lg mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                {item.name}
              </h3>

              {/* Rating */}
              <div className="h-8 flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <BiStar size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-slate-300 text-sm font-semibold">
                    {item.rating}
                  </span>
                </div>
                <span className="text-slate-500 text-xs">
                  ({item.reviewsCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-cyan-400">
                  ${Math.round(
                    item.price - (item.price * item.priceDiscount!) / 100
                  )}
                </span>
                {item.priceDiscount ? (
                  <span className="text-slate-500 line-through text-sm">
                    ${item.price}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trends;
