import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../hook/queries/useProduct";
import LoadingFallback from "../../../shared/ui/LoadingFallback";

const Products = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
    search: ""
  });

  const { data: products, isLoading, error } = useProducts(filters);

  if (isLoading) return <LoadingFallback />
  if (error) return <div>Error: {error.message}</div>

  return (
    <section className="w-full flex flex-col mx-auto justify-center items-center px-4 py-12">
      <h1 className="font-semibold text-xl text-slate-100 my-10 uppercase">
        Productos populares
      </h1>
      <div className="max-w-7xl h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 m-auto">
        {products?.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products/${item.slug}`)}
            className="relative flex w-60 flex-col object-cover overflow-hidden rounded-2xl bg-slate-800/50 border-2 border-slate-700 hover:border-cyan-500/50 drop-shadow-lg/20 drop-shadow-black-500/20 cursor-pointer group"
          >
            <div className="pb-5">
              <div className="w-80 h-64">
                <img src={`${item.images![0]}`} className="w-full h-full group-hover:scale-110 transition-transform duration-300 object-cover" />
              </div>

              <h5 className="pt-4 h-10 text-md text-center tracking-tight text-slate-100 font-bold">
                {item.name}
              </h5>

              <div className="mt-3 mb-5 flex flex-col items-center justify-center">
                <p>
                  <span className="text-xl font-bold text-cyan-400 mr-1">
                    $
                    {Math.round(
                      item.price - (item.price * item.priceDiscount!) / 100
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

export default Products;
