import React, { useState } from "react";
import { BsGrid, BsList } from "react-icons/bs";
import CardProductList from "../components/listProducts/CardProductList";
import CardCategoryList from "../components/listProducts/CardCategoryList";
import CardFilterPrice from "../components/listProducts/CardFilterPrice";
import type { Brand } from "../types/product.types";
import CardFilterBrand from "../components/listProducts/CardFilterBrand";
import Pagination from "../../../shared/ui/Pagination";
import { products } from "../const/menuCategory";
import BreadCrumbs from "../../../shared/ui/BreadCrumbs";
import ButtonAction from "../../../shared/ui/ButtonAction";

const ListProductsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [brands, setBrands] = useState<Brand[]>([
    { name: "Apple", checked: false },
    { name: "Samsung", checked: false },
    { name: "Sony", checked: true },
    { name: "Dell", checked: false },
  ]);  

  const totalPages = 8;

  const handleBrandToggle = (index: number) => {
    const updatedBrands = [...brands];
    updatedBrands[index].checked = !updatedBrands[index].checked;
    setBrands(updatedBrands);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Breadcrumb */}
      <BreadCrumbs />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 shrink-0 space-y-6">
            {/* Categories */}
            <CardCategoryList />

            {/* Price Filter */}
            <CardFilterPrice />

            {/* Brand Filter */}
            <CardFilterBrand brands={brands} onClick={handleBrandToggle} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-slate-400">
                Mostrando 1-12 de{" "}
                <span className="text-cyan-400 font-semibold">
                  86 resultados
                </span>
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-700 border border-slate-600 text-slate-100 px-4 py-2 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="popularity">Popularidad</option>
                    <option value="price-low">Precio: Bajo a Alto</option>
                    <option value="price-high">Precio: Alto a Bajo</option>
                    <option value="newest">Más Recientes</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <ButtonAction
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                    text=""
                    variant="outline"
                  >
                    <BsGrid size={20} />
                  </ButtonAction>
                  <ButtonAction className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`} onClick={() => setViewMode("list")} text="" variant="outline">
                    <BsList size={20} />
                  </ButtonAction>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 mb-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {products.map((product) => (
                <CardProductList key={product.id} product={product} viewMode={viewMode}/>                
              ))}
            </div>

            {/* Pagination */}
            <Pagination totalPages={totalPages}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductsPage;