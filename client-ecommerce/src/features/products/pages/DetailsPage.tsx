import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ButtonAction from "../../../shared/ui/ButtonAction";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import { product } from "../const/menuCategory";
import TabsSection from "../components/detailsProduct/TabsSection";
import BreadCrumbs from "../../../shared/ui/BreadCrumbs";

const DetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState<string>(product.image);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Breadcrumb */}
      <BreadCrumbs />

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto w-full px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery */}
          <div className="flex gap-4 lg:w-1/2">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.images!.map((image: string, index: number) => (
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
                      product.rating! > i
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
                Ahorra ${product.price - product.offerPrice!}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-lg text-slate-200 font-semibold mb-3">
                Acerca del Producto
              </p>
              <ul className="space-y-2 text-slate-400">
                {product.description!.map((desc: string, index: number) => (
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
              <ButtonAction onClick={() => navigate('/cart')} children={<BsCartPlus size={18}/>} text={"Agregar al carrito"} variant="secondary"/>
              <ButtonAction onClick={() => {}} children={<BsCartCheck size={18}/>} text={"Comprar"} variant="primary"/>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <TabsSection />
    </div>
  );
};

export default DetailsPage;
