import React, { useEffect, useState } from "react";
import { BsTrash2 } from "react-icons/bs";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import type { CartResponseItems } from "../../types/cart.types";
import { useCartDeleteMutation, useCartUpdateMutation } from "../../hook/mutation/useCartMutation";
import { RiSubtractFill } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";

interface ProductProps {
  products: CartResponseItems | null | undefined;
}

const ShopList: React.FC<ProductProps> = ({ products }) => {
  const deleteCartMutation = useCartDeleteMutation();
  const updateCartMutation = useCartUpdateMutation();
  const [localQuantity, setLocalQuantity] = useState<number>(products?.quantity!);

  // Sincroniza si el producto cambia (por si se recarga el carrito)
  useEffect(() => {
    setLocalQuantity(products?.quantity!);
  }, [products?.quantity]);

  const calculateItemTotal = () => {
    if (!products) return 0;

    const hasDiscount = products.discount > 0;
    const pricePerUnit = hasDiscount
      ? products.price * (1 - products.discount / 100)
      : products.price;

    return (pricePerUnit * localQuantity).toFixed(2);
  };

  const handleIncrement = async () => {
    if (localQuantity < products?.stock!) {
      const newQuantity = localQuantity + 1;
      setLocalQuantity(newQuantity);
      await updateCartMutation.mutateAsync({
        id: products?.id!,
        quantity: newQuantity,
      });
    }
  };

  const handleDecrement = async () => {
    if (localQuantity > 1) {
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      await updateCartMutation.mutateAsync({
        id: products?.id!,
        quantity: newQuantity,
      });
    }
  };

  const handleRemoveProduct = async () => {
    try {
      await deleteCartMutation.mutateAsync(products?.id!);
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <div
        className="grid md:grid-cols-[2fr_1fr_1fr] gap-4 items-center bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/50 transition-all"
      >
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 shrink-0 bg-slate-700/50 border-2 border-slate-600 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={products?.image}
              alt={products?.name}
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-100 text-lg mb-1">
              {products?.name}
            </p>
            <div className="text-sm text-slate-400 space-y-1">
              <p className="text-slate-300">
                Precio unitario: ${products?.price}
              </p>
              {products?.discount! > 0 && (
                <p className="text-green-500 text-xs">
                  Descuento: {products?.discount}%
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <p>Cantidad:</p>
                <div className="w-32 p-2 rounded-[170px] border border-cyan-500 justify-around items-center flex">
                  <RiSubtractFill
                    size={12}
                    className={`cursor-pointer ${localQuantity <= 1 ? 'text-slate-600' : 'text-cyan-500'}`}
                    onClick={handleDecrement}
                  />
                  <span className="w-8 text-center text-cyan-500 text-base font-normal leading-normal">
                    {localQuantity}
                  </span>
                  <IoIosAdd
                    size={12}
                    className={`cursor-pointer ${localQuantity >= products?.stock! ? 'text-slate-600' : 'text-cyan-500'}`}
                    onClick={handleIncrement}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtotal */}
        <p className="text-center text-xl font-bold text-cyan-400 md:block hidden">
          ${calculateItemTotal()}
        </p>

        {/* Remove Button */}
        <div className="w-full h-fit flex justify-end text-right items-start">
          <ButtonAction
            variant="danger"
            text=""
            onClick={() => handleRemoveProduct()}>
            <BsTrash2 size={20} />
          </ButtonAction>
        </div>

        {/* Mobile Subtotal */}
        <p className="md:hidden text-right text-xl font-bold text-cyan-400">
          ${calculateItemTotal()}
        </p>
      </div>
    </div>
  );
};

export default ShopList;
