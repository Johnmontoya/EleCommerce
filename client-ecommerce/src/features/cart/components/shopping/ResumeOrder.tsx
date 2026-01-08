import { BiCreditCard, BiMapPin } from "react-icons/bi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MdOutlinePayment } from "react-icons/md";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import useInputs from "../../../../shared/hooks/useInputs";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useCartCreateOrderMutation } from "../../hook/mutation/useCartMutation";
import type { CartResponseItems } from "../../types/cart.types";
import { useEffect } from "react";
import { useAddressUser } from "../../hook/queries/useCart";
import type { Address } from "../../../profile/types/profile.types";
import ModalAddress from "../../../profile/components/ModalAddress";
import { usePayment } from "../../../payment/hook/queries/usePayment";

interface ProductProps {
  products: CartResponseItems[] | undefined;
}

interface ValidationErrors {
  [key: string]: string[];
}

const ResumeOrder: React.FC<ProductProps> = ({ products }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const createOrderMutation = useCartCreateOrderMutation();
  const { data: addressUser } = useAddressUser();
  const { data: payment } = usePayment(user?.id || "");
  const playerRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpenAddress, setIsModalOpenAddress] = useState(false);
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] =
    useState<string>("No address found");
  const [selectedAddressId, setSelectedAddressId] =
    useState<string>("");

  const [orderData, onChangeCreateData, setOrderData] = useInputs({
    userId: user?.id || "",
    subtotal: 0,
    tax: 0,
    shippingCost: 0,
    discount: 0,
    total: 0,
    paymentMethod: "",
    addressId: "",
    trackingNumber: "",
    notes: "",
    items: products || [],
  })

  // Recalcular subtotal, tax y total cada vez que cambien los products
  useEffect(() => {
    if (!products || products.length === 0) {
      setOrderData((prev: any) => ({
        ...prev,
        subtotal: 0,
        tax: 0,
        total: 0,
        items: [],
      }));
      return;
    }

    let discount = 0;

    const calculateSubTotal = (items: CartResponseItems[]) => {
      return items.reduce((acc, item) => {
        // 1. Calculamos el precio de este producto individualmente
        const hasDiscount = item.discount > 0;

        const finalItemPrice = hasDiscount
          ? item.price * (1 - item.discount / 100)
          : item.price;

        discount += item.discount;

        // 2. Multiplicamos por la cantidad y lo sumamos al acumulador
        return acc + (finalItemPrice * item.quantity);
      }, 0);
    };

    const subtotal = calculateSubTotal(products);

    const totalAPagar = subtotal;

    let shippingCost = 0;

    if (totalAPagar < 150000) {
      shippingCost = 15000;
    }
    const tax = totalAPagar * 0.02; // 2% IVA
    const total = totalAPagar + tax + shippingCost;

    setOrderData((prev: any) => ({
      ...prev,
      addressId: selectedAddressId,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      shippingCost,
      trackingNumber: `TRK-${crypto.randomUUID().toUpperCase()}`,
      items: products,
      discount: discount,
      notes: orderData.notes || null,
    }));
  }, [products, setOrderData, user?.id, selectedAddressId]);

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const getFieldsError = (fieldName: string): string | undefined => {
    return validationErrors[fieldName]?.[0];
  }

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    try {
      if (user?.id === null) {
        toast.error("Por favor ingresa a la cuenta para realizar el pedido");
        return;
      }
      await createOrderMutation.mutateAsync(orderData);
      handlePlay()
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      const errorsData =
        getFieldsError("subtotal") ||
        getFieldsError("tax") ||
        getFieldsError("shippingCost") ||
        getFieldsError("total") ||
        getFieldsError("paymentMethod") ||
        getFieldsError("addressId") ||
        getFieldsError("trackingNumber")

      if (validationErrors) {
        toast.error(errorsData);
      }
    }
  }

  const handleAddressSelect = (addressId: string, addressData: Address) => {
    if (addressData.street === null || addressData.city === null || addressData.state === null || addressData.zipCode === null) {
      toast.error("Por favor selecciona una dirección");
      return;
    }
    setSelectedAddressId(addressId);
    setSelectedAddress(addressData.street + ', ' + addressData.city + ', ' + addressData.state + ', ' + addressData.zipCode);
    setShowAddress(false);
  };

  const handlePlay = () => {
    setIsVisible(true);

    playerRef.current?.play();
    setTimeout(() => {
      navigate("/");
    }, 6000);
  };

  return (
    <>
      <ModalAddress
        isOpen={isModalOpenAddress}
        onClose={() => setIsModalOpenAddress(false)}
        title="Agregar Dirección"
        data={user!}
      />

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
                  <p className="text-slate-300 text-sm">{selectedAddress.includes("null, null, null, null") ? "Agrega una dirección" : selectedAddress}</p>
                  <button
                    onClick={() => setShowAddress(!showAddress)}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                  >
                    Cambiar
                  </button>
                </div>
                {showAddress && (
                  addressUser?.map((address: Address) => (
                    <div key={address.id} className="absolute top-full mt-2 w-full bg-slate-800 border-2 border-slate-600 rounded-lg shadow-2xl z-10 overflow-hidden">
                      <button
                        onClick={() => handleAddressSelect(address.id, address)}
                        className="w-full text-left text-slate-300 p-3 hover:bg-slate-700 transition-colors"
                      >
                        {address.street === null || address.city === null || address.state === null || address.zipCode === null ? (
                          <>Agrega una dirección</>
                        ) : (
                          <>{address.street}, {address.city}, {address.state}, {address.zipCode}</>
                        )}

                      </button>
                      <button
                        onClick={() => setIsModalOpenAddress(true)}
                        className="w-full text-center text-cyan-400 p-3 hover:bg-cyan-500/10 transition-colors font-medium border-t border-slate-700"
                      >
                        + Agregar dirección
                      </button>
                    </div>
                  )))}
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
                name="paymentMethod"
                value={orderData.paymentMethod}
                onChange={onChangeCreateData}
                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                <option value="COD">Pago Contra Entrega</option>
                <option value="Online">Pago en Línea</option>
                <option value="Card">Tarjeta de Crédito {payment?.cardNumber.slice(0, 4) + "..."}</option>
              </select>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <BiCreditCard size={18} className="text-cyan-400" />
                <p className="text-sm font-semibold text-slate-200 uppercase">
                  Notas
                </p>
              </div>
              <textarea
                name="notes"
                placeholder="Añade notas al pedido"
                value={orderData.notes}
                onChange={onChangeCreateData}
                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              ></textarea>
            </div>
          </div>

          <div className="h-px bg-slate-700 my-6"></div>

          {/* Price Breakdown */}
          <div className="space-y-3 text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${orderData.subtotal!}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span className="text-green-400 font-semibold">
                {orderData.shippingCost > 0 ? `${orderData.shippingCost}` : "Gratis"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>IVA (2%)</span>
              <span className="font-semibold">${orderData.tax}</span>
            </div>
            <div className="h-px bg-slate-700 my-4"></div>
            <div className="flex justify-between text-xl font-bold text-slate-100">
              <span>Total:</span>
              <span className="text-cyan-400">${orderData.total}</span>
            </div>
          </div>

          <div
            className={`fixed ${isVisible ? "flex" : "hidden"
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
            onClick={handleSubmit}
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
    </>

  );
};

export default ResumeOrder;
