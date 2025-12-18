import { useNavigate } from "react-router-dom";
import { categories } from "../../../assets/assets";

const Category = () => {
  const navigate = useNavigate()

  const handleCategoryClick = (categoryId: string) => {
    // Navegar a la página de productos con la categoría en la URL
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center h-fit overflow-auto">
      <h1 className="font-semibold text-xl text-slate-100 my-10 uppercase">
        CATEGORIAS DE TENDENCIA
      </h1>
      <div className="absolute top-280 left-10 w-40 h-40 bg-purple-500/30 rounded-full filter blur-3xl animate-float2"></div>
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center gap-4 overflow-x-auto py-2 px-2">
          {categories.map((cat, idx) => (
            <div key={idx} onClick={() => handleCategoryClick('67b5a3f8c1239c9cb4e4c825')} className="w-48 h-56 flex flex-col items-center">

              <div className="-top-10 left-10 flex flex-row gap-2 text-xs items-center">
                <div className="w-3 h-3 bg-cyan-500 shadow-lg shadow-cyan-500/90 rounded-full"></div>
                <span className="text-slate-100 font-light">161 articulos</span>
              </div>

              <div
                className={`w-full h-full bg-slate-800/50 border-2 border-slate-700 hover:border-cyan-500/50 rounded-2xl flex items-center justify-center text-4xl cursor-pointer group`}
              >
                <img src={cat.icon} className="w-40 h-36 rounded-2xl group-hover:scale-110 transition-transform duration-300" />
              </div>

              <div className="relative w-full h-full text-xs text-center">
                <p className="-top-40 left-10 font-bold uppercase text-slate-100">
                  {cat.name}
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
