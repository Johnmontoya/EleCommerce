import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsGrid, BsList } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
}

interface Brand {
  name: string;
  checked: boolean;
}

const ListProductsPage: React.FC = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [priceRange, setPriceRange] = useState<number>(1250);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("Laptops");

  const [brands, setBrands] = useState<Brand[]>([
    { name: "Apple", checked: false },
    { name: "Samsung", checked: false },
    { name: "Sony", checked: true },
    { name: "Dell", checked: false },
  ]);

  const products: Product[] = [
    {
      id: 1,
      name: "AeroBlade Gaming Laptop",
      price: 1799.0,
      originalPrice: 1999.0,
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      category: "Laptops",
      brand: "Sony",
    },
    {
      id: 2,
      name: "Aura Wireless Headphones",
      price: 249.0,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Audio",
      brand: "Sony",
    },
    {
      id: 3,
      name: "Quantum X Smartphone",
      price: 999.0,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      category: "Smartphones",
      brand: "Samsung",
    },
    {
      id: 4,
      name: "Chrono Smartwatch V2",
      price: 329.0,
      originalPrice: 379.0,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Smartwatches",
      brand: "Apple",
    },
    {
      id: 5,
      name: "Vortex Gaming Console",
      price: 499.0,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      category: "Gaming Consoles",
      brand: "Sony",
    },
    {
      id: 6,
      name: "MatrixPad Pro Tablet",
      price: 649.0,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      category: "Tablets",
      brand: "Apple",
    },
  ];

  const categories = [
    "Smartphones",
    "Laptops",
    "Tablets",
    "Audio",
    "Gaming Consoles",
    "Smartwatches",
    "Accessories",
  ];

  const totalPages = 8;

  const handleBrandToggle = (index: number) => {
    const updatedBrands = [...brands];
    updatedBrands[index].checked = !updatedBrands[index].checked;
    setBrands(updatedBrands);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto flex justify-start items-center px-4 py-4">
        <p className="text-slate-300 font-light text-sm">
          <span className="hover:text-cyan-400 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-cyan-400 cursor-pointer">Products</span>
          <span className="mx-2">/</span>
          <span className="hover:text-cyan-400 cursor-pointer">
            {products[0].category}
          </span>
          <span className="mx-2">/</span>
          <span className="text-slate-100 font-medium">{products[0].name}</span>
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 shrink-0 space-y-6">
            {/* Categories */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 mb-4">
                Categorías
              </h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === category
                          ? "bg-cyan-500/20 text-cyan-400 font-semibold"
                          : "text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 mb-4">
                Filtrar por Precio
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="2500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-sm text-slate-400">
                  <span>${0}</span>
                  <span className="text-cyan-400 font-semibold">
                    ${priceRange}
                  </span>
                  <span>${2500}</span>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Marcas</h3>
              <ul className="space-y-3">
                {brands.map((brand, index) => (
                  <li key={brand.name}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={brand.checked}
                        onChange={() => handleBrandToggle(index)}
                        className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                        {brand.name}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
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
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    <BsGrid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    <BsList size={20} />
                  </button>
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
                <div
                  key={product.id}
                  className={`bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all group ${
                    viewMode === "list" ? "flex gap-6" : ""
                  }`}
                >
                  <div
                    className={`bg-slate-900/50 flex items-center justify-center overflow-hidden ${
                      viewMode === "list" ? "w-48 shrink-0" : "h-64"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-cyan-400">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-slate-500 line-through text-sm">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => navigate("/cart")}
                      className="w-full bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-100 py-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2 font-semibold cursor-pointer group/btn"
                    >
                      <CiShoppingCart
                        size={18}
                        className="group-hover/btn:animate-bounce"
                      />
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BiChevronLeft size={20} />
              </button>

              {[1, 2, 3, "...", 8].map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  disabled={page === "..."}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? "bg-cyan-500 text-white"
                      : page === "..."
                      ? "text-slate-500 cursor-default"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductsPage;