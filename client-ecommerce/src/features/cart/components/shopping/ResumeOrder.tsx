import { BiCreditCard, BiMapPin } from "react-icons/bi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MdOutlinePayment } from "react-icons/md";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    products: Product[]
}

const ResumeOrder: React.FC<ProductProps> = ({ products }) => {
  const navigate = useNavigate();
  const playerRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] =
    useState<string>("No address found");
  const [paymentMethod, setPaymentMethod] = useState<string>("COD");

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
      navigate("/");
    }, 5000);
  };

  return (
    <div className="lg:w-96 w-full">
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
                <p className="text-slate-300 text-sm">{selectedAddress}</p>
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
                    onClick={() => handleAddressSelect("Los Angeles, USA")}
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
          className={`fixed ${
            isVisible ? "flex" : "hidden"
          } z-50 inset-0 bg-gray-900/50 bg-opacity-60 overflow-y-auto h-full w-full px-4`}
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
        <ButtonAction
          onClick={handlePlay}
          className="w-full flex justify-center items-center"
          variant="primary"
          text="Realizar Pedido"
        >
          <MdOutlinePayment size={18} />
        </ButtonAction>

        <p className="text-center text-slate-500 text-xs mt-4">
          Compra segura y protegida 🔒
        </p>
      </div>
    </div>
  );
};

export default ResumeOrder;
