import React, { useState } from "react";
import BreadCrumbs from "../../../shared/ui/BreadCrumbs";
import ShopList from "../components/shopping/ShopList";
import ResumeOrder from "../components/shopping/ResumeOrder";

interface Product {
  name: string;
  description: string[];
  offerPrice: number;
  price: number;
  quantity: number;
  size: number;
  image: string;
  category: string;
}

const ShoppingCartPage: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([
    {
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      category: "Footwear",
    },
    {
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
      category: "Footwear",
    },
    {
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
      category: "Footwear",
    },
  ]);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Breadcrumb */}
        <BreadCrumbs />

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-4 pb-8 mx-auto">
          {/* Cart Items Section */}
          <div className="w-full flex-1">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-slate-100">
                Carrito de Compras
              </h1>
              <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold">
                {products.length} {products.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-slate-400 text-sm font-semibold pb-4 border-b border-slate-700">
              <p className="text-left">Detalles del Producto</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Acción</p>
            </div>

            {/* Products List */}
            <ShopList products={products} setProducts={setProducts}/>
          </div>

          {/* Order Summary Section */}
          <ResumeOrder products={products}/>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPage;
