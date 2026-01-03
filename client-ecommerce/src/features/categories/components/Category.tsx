import { useNavigate } from "react-router-dom";
import { useCategories } from "../hook/queries/useCategory";
import LoadingFallback from "../../../shared/ui/LoadingFallback";

const Category = () => {
  const navigate = useNavigate()
  const { data: categories, isLoading } = useCategories({
    isPublished: true
  })

  const handleCategoryClick = (id: string) => {
    // Navegar a la página de productos con la categoría en la URL
    navigate(`/products?category=${id}`);
  };

  if (isLoading) return <LoadingFallback />

  return (
    <div className="w-full flex flex-col justify-start items-center h-fit overflow-auto">
      <h1 className="font-semibold text-xl text-slate-100 my-10 uppercase">
        CATEGORIAS DE TENDENCIA
      </h1>
      <div className="absolute top-280 left-10 w-40 h-40 bg-purple-500/30 rounded-full filter blur-3xl animate-float2"></div>
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center gap-4 overflow-x-auto py-2 px-2">
          {categories?.slice(0, 6).map((item, index) => (
            <div key={index} onClick={() => handleCategoryClick(item.id)} className="w-48 h-56 flex flex-col items-center">

              <div
                className={`w-full h-full bg-slate-800/50 border-2 border-slate-700 hover:border-cyan-500/50 rounded-2xl flex items-center justify-center text-4xl cursor-pointer group`}
              >
                <img src={item.image} className="w-40 h-36 rounded-2xl group-hover:scale-110 transition-transform duration-300" />
              </div>

              <div className="relative w-full h-full text-xs text-center">
                <p className="-top-40 left-10 font-bold uppercase text-slate-100">
                  {item.name}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category;
