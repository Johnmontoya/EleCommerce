import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  rating: number;
  images: string[];
  description: string[];
}

interface TabContent {
  title: string;
  content: string;
}

type TabType = "description" | "specs" | "reviews";

const DetailsPage: React.FC = () => {
  const navigate = useNavigate();

  const product: Product = {
    name: "Nike Pegasus 41 shoes",
    category: "Sports",
    price: 189,
    offerPrice: 159,
    rating: 4,
    images: [
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
    ],
    description: [
      "High-quality material",
      "Comfortable for everyday use",
      "Available in different sizes",
    ],
  };

  const [thumbnail, setThumbnail] = useState<string>(product.images[0]);
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const tabContent: Record<TabType, TabContent> = {
    description: {
      title: "Descripción del Producto",
      content: `Vestibulum condimentum imperdiet velit nec ornare. Nullam lobortis
        urna posuere quam porta consequat. Donec commodo diam lectus, sit
        amet tempor dolor scelerisque eget. Vestibulum at lectus dui.
        Maecenas consectetur tempor ipsum non porttitor. Cras accumsan
        mattis aliquam. Fusce eleifend maximus elit facilisis condimentum.
        Mauris non risus sed ligula convallis fermentum.
        
        Quisque eu purus nunc. Ut eget ligula ac lorem laoreet scelerisque
        in ut nulla. Quisque volutpat elit eget tellus pharetra, vel
        sollicitudin velit scelerisque. Vivamus ac libero eu nunc congue
        malesuada eu vitae est.`,
    },
    specs: {
      title: "Especificaciones Técnicas",
      content: `Material: Mesh sintético de alta calidad con soporte adicional.
        Suela: Goma duradera con tecnología de amortiguación Nike Air.
        Peso: 280g (talla 42).
        Colores disponibles: Negro, Blanco, Gris, Azul.
        Tallas: 38-46.
        Uso recomendado: Running, entrenamiento deportivo, uso casual.`,
    },
    reviews: {
      title: "Opiniones de Clientes (150)",
      content: `⭐⭐⭐⭐⭐ "Excelentes zapatos, muy cómodos para correr largas distancias." - María G.
        
        ⭐⭐⭐⭐ "Buena calidad pero un poco ajustados al principio." - Carlos R.
        
        ⭐⭐⭐⭐⭐ "Los mejores zapatos deportivos que he tenido. Totalmente recomendados." - Ana L.
        
        ⭐⭐⭐⭐ "Relación calidad-precio excelente. Los uso todos los días." - Pedro M.`,
    },
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
            {product.category}
          </span>
          <span className="mx-2">/</span>
          <span className="text-slate-100 font-medium">{product.name}</span>
        </p>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto w-full px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery */}
          <div className="flex gap-4 lg:w-1/2">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.images.map((image: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`border-2 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    thumbnail === image
                      ? "border-cyan-400 shadow-lg shadow-cyan-400/50"
                      : "border-slate-600 hover:border-slate-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 border-2 border-slate-600 rounded-2xl overflow-hidden bg-slate-800/50">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl text-slate-100 font-bold mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {Array(5)
                .fill("")
                .map((_, i: number) => (
                  <FaStar
                    key={i}
                    size={18}
                    className={
                      product.rating > i
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-500"
                    }
                  />
                ))}
              <p className="text-base ml-2 text-slate-300">
                ({product.rating}.0)
              </p>
            </div>

            {/* Price */}
            <div className="mb-8 bg-slate-800/50 p-4 rounded-xl">
              <p className="text-slate-400 line-through text-lg">
                MRP: ${product.price}
              </p>
              <p className="text-3xl font-bold text-cyan-400">
                ${product.offerPrice}
              </p>
              <span className="text-slate-500 text-sm mr-1">
                (Incluye todos los impuestos)
              </span>
              <div className="mt-2 inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                Ahorra ${product.price - product.offerPrice}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-lg text-slate-200 font-semibold mb-3">
                Acerca del Producto
              </p>
              <ul className="space-y-2 text-slate-400">
                {product.description.map((desc: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-44 p-2 my-9 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex">
              <RiSubtractFill size={20} className="cursor-pointer" />
              <span className="w-10 text-center text-[#191919] text-base font-normal leading-normal">
                5
              </span>
              <IoIosAdd size={20} className="cursor-pointer" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/cart")}
                className="flex-1 py-4 px-6 rounded-xl font-semibold bg-slate-700 text-slate-100 hover:bg-slate-600 transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2  group/btn"
              >
                <CiShoppingCart
                  size={18}
                  className="group-hover/btn:animate-bounce"
                />
                Agregar al carrito
              </button>
              <button className="flex-1 py-4 px-6 rounded-xl font-semibold bg-linear-to-r from-cyan-500 to-cyan-500 text-white hover:from-cyan-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50 cursor-pointer">
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="w-full max-w-7xl mx-auto mt-16 px-6 pb-16">
        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-start items-start gap-2 px-3 mb-0">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 font-semibold rounded-t-lg transition-all ${
              activeTab === "description"
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Descripción
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`px-6 py-3 font-semibold rounded-t-lg transition-all ${
              activeTab === "specs"
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Especificaciones
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 font-semibold rounded-t-lg transition-all ${
              activeTab === "reviews"
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Reviews (150)
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-800/50 border border-slate-700 shadow-xl rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-slate-100">
            {tabContent[activeTab].title}
          </h2>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {tabContent[activeTab].content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
