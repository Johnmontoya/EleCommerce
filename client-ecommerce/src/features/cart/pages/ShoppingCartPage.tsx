import React, { useRef, useState } from "react";
import { BiCreditCard, BiMapPin } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../shared/ui/BreadCrumbs";

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
  const navigate = useNavigate()
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] =
    useState<string>("No address found");
  const [paymentMethod, setPaymentMethod] = useState<string>("COD");
  const playerRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setShowAddress(false);
  };

  // Cálculos
  const subtotal = products.reduce(
    (acc, product) => acc + product.offerPrice * product.quantity,
    0
  );
  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  const handlePlay = () => {
    setIsVisible(true);

    playerRef.current?.play();
    setTimeout(() => {
      navigate('/')
    }, 5000)
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Breadcrumb */}
        <BreadCrumbs />

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-6 my-8 mx-auto">
          {/* Cart Items Section */}
          <div className="flex-1">
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
                          Talla:{" "}
                          <span className="text-slate-300">{product.size}</span>
                        </p>
                        <div className="flex items-center gap-2">
                          <p>Cantidad:</p>
                          <select
                            value={product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                index,
                                parseInt(e.target.value)
                              )
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
                  <button
                    onClick={() => handleRemoveProduct(index)}
                    className="mx-auto bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-lg transition-all transform hover:scale-110 active:scale-95"
                    title="Eliminar producto"
                  >
                    <BsTrash2 size={20} />
                  </button>

                  {/* Mobile Subtotal */}
                  <p className="md:hidden text-right text-xl font-bold text-cyan-400">
                    ${product.offerPrice * product.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-[400px] w-full">
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-6">
                {/* Delivery Address */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BiMapPin size={18} className="text-cyan-400" />
                    <p className="text-sm font-semibold text-slate-200 uppercase">
                      Dirección de Entrega
                    </p>
                  </div>
                  <div className="relative">
                    <div className="flex justify-between items-start bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                      <p className="text-slate-300 text-sm">
                        {selectedAddress}
                      </p>
                      <button
                        onClick={() => setShowAddress(!showAddress)}
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                      >
                        Cambiar
                      </button>
                    </div>
                    {showAddress && (
                      <div className="absolute top-full mt-2 w-full bg-slate-800 border-2 border-slate-600 rounded-lg shadow-2xl z-10 overflow-hidden">
                        <button
                          onClick={() => handleAddressSelect("New York, USA")}
                          className="w-full text-left text-slate-300 p-3 hover:bg-slate-700 transition-colors"
                        >
                          New York, USA
                        </button>
                        <button
                          onClick={() =>
                            handleAddressSelect("Los Angeles, USA")
                          }
                          className="w-full text-left text-slate-300 p-3 hover:bg-slate-700 transition-colors"
                        >
                          Los Angeles, USA
                        </button>
                        <button
                          onClick={() => setShowAddress(false)}
                          className="w-full text-center text-cyan-400 p-3 hover:bg-cyan-500/10 transition-colors font-medium border-t border-slate-700"
                        >
                          + Agregar dirección
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BiCreditCard size={18} className="text-cyan-400" />
                    <p className="text-sm font-semibold text-slate-200 uppercase">
                      Método de Pago
                    </p>
                  </div>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="COD">Pago Contra Entrega</option>
                    <option value="Online">Pago en Línea</option>
                    <option value="Card">Tarjeta de Crédito</option>
                  </select>
                </div>
              </div>

              <div className="h-px bg-slate-700 my-6"></div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-green-400 font-semibold">Gratis</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (2%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-700 my-4"></div>
                <div className="flex justify-between text-xl font-bold text-slate-100">
                  <span>Total:</span>
                  <span className="text-cyan-400">${total.toFixed(2)}</span>
                </div>
              </div>

              
                <div
                  className={`fixed ${isVisible ? 'flex' : 'hidden'} z-50 inset-0 bg-gray-900/50 bg-opacity-60 overflow-y-auto h-full w-full px-4`}
                >
                  <DotLottieReact
                    src="https://lottie.host/23df5b74-f4c6-47c9-b928-261e7155eb8d/ONtANo09KW.lottie"
                    autoplay={false}
                    loop={false}
                    className="w-96 h-64 m-auto"
                    dotLottieRefCallback={(doLottie) => {
                      playerRef.current = doLottie;
                    }}
                  />
                </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlay}
                className="w-full py-4 mt-6 bg-linear-to-r from-cyan-500 to-cyan-500 hover:from-cyan-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50 cursor-pointer"
              >
                Realizar Pedido
              </button>

              <p className="text-center text-slate-500 text-xs mt-4">
                Compra segura y protegida 🔒
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPage;
