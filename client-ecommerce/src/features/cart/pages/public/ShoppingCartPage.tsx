import React, { useMemo } from "react";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import ShopList from "../../components/shopping/ShopList";
import ResumeOrder from "../../components/shopping/ResumeOrder";
import { useCartUser } from "../../hook/queries/useCart";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";

const ShoppingCartPage: React.FC = () => {
  const { data: cart, isLoading, error } = useCartUser();

  const sortedCart = useMemo(() => {
    if (!cart) return [];
    // Ordena por ID para mantener consistencia
    return [...cart].sort((a, b) => a.id.localeCompare(b.id));
  }, [cart]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="min-h-screen background-light dark:background-light">
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
                Items
              </span>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-slate-400 text-sm font-semibold pb-4 border-b border-slate-700">
              <p className="text-left">Detalles del Producto</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Acción</p>
            </div>

            {/* Products List */}
            {sortedCart && sortedCart.length > 0 ? (
              sortedCart.map((item) => (
                <ShopList key={item.id} products={item} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">
                  Tu carrito está vacío
                </p>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <ResumeOrder products={cart} />
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPage;
