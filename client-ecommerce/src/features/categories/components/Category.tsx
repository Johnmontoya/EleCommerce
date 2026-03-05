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
    <div className="w-full flex flex-col justify-start items-center h-fit overflow-auto py-8">
      <div className="flex items-center justify-center gap-4 mb-10 w-full">
        <div className="h-[1px] bg-zinc-800 flex-1 hidden md:block max-w-xs" />
        <h1 className="font-bold text-2xl text-white uppercase tracking-[0.2em]" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          CATEGORÍAS EN TENDENCIA //
        </h1>
        <div className="h-[1px] bg-zinc-800 flex-1 hidden md:block max-w-xs" />
      </div>
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center gap-6 py-2">
          {categories?.slice(0, 6).map((item, index) => (
            <div key={index} onClick={() => handleCategoryClick(item.id!)} className="w-full h-48 flex flex-col relative group cursor-pointer transition-all">
              {/* Tech Accents Hover */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

              <div
                className={`w-full h-full bg-[#050505] border border-zinc-800 group-hover:border-zinc-500 relative flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500`}
              >
                {/* Scanline subtle */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] z-10 opacity-50 pointer-events-none" />

                <img src={item.image} className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-700 relative z-0" />

                {/* Etiqueta Inferior Técnica */}
                <div className="absolute bottom-0 left-0 w-full bg-black/80 border-t border-zinc-800 py-2 z-20 backdrop-blur-sm group-hover:bg-[#00f0ff] transition-colors">
                  <p className="text-center font-bold uppercase tracking-widest text-[#00f0ff] group-hover:text-black text-xs">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category;
