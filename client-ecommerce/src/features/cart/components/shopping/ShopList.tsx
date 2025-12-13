import React from "react";
import { BsTrash2 } from "react-icons/bs";
import ButtonAction from "../../../../shared/ui/ButtonAction";

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

interface ProductProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<any>>;
}

const ShopList: React.FC<ProductProps> = ({ products, setProducts }) => {
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="space-y-4 mt-6">
      {products.map((product, index) => (
        <div
          key={index}
          className="grid md:grid-cols-[2fr_1fr_1fr] gap-4 items-center bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/50 transition-all"
        >
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 shrink-0 bg-slate-700/50 border-2 border-slate-600 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-100 text-lg mb-1">
                {product.name}
              </p>
              <div className="text-sm text-slate-400 space-y-1">
                <p>
                  Talla: <span className="text-slate-300">{product.size}</span>
                </p>
                <div className="flex items-center gap-2">
                  <p>Cantidad:</p>
                  <select
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    className="bg-slate-700 border border-slate-600 text-slate-100 rounded px-2 py-1 outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {Array(10)
                      .fill("")
                      .map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </div>
                <p className="text-slate-500 line-through text-xs">
                  ${product.price}
                </p>
              </div>
            </div>
          </div>

          {/* Subtotal */}
          <p className="text-center text-xl font-bold text-cyan-400 md:block hidden">
            ${product.offerPrice * product.quantity}
          </p>

          {/* Remove Button */}
          <div className="w-full h-fit flex justify-end text-right items-start">
            <ButtonAction
            variant="danger"
            text=""
            onClick={() => handleRemoveProduct(index)}>
              <BsTrash2 size={20} />
            </ButtonAction>
          </div>

          {/* Mobile Subtotal */}
          <p className="md:hidden text-right text-xl font-bold text-cyan-400">
            ${product.offerPrice * product.quantity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShopList;
