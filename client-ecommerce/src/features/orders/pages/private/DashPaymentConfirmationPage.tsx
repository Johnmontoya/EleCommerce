import React, { useEffect, useState } from "react";
import { BiCheckCircle, BiPackage, BiDownload, BiHome } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DashPaymentConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(true);

  // Datos de ejemplo del pedido confirmado
  const orderData = {
    orderNumber: "ORD-2026-001234",
    date: new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    estimatedDelivery: "5-7 días hábiles",
    total: 310.79,
    paymentMethod: "Tarjeta Visa ****1234",
    shippingAddress: "Calle 123 #45-67, Bogotá, Colombia",
    email: "usuario@ejemplo.com",
  };

  const orderItems = [
    {
      id: "1",
      name: "Producto Premium XL",
      quantity: 2,
      price: 129.99,
      image: "https://via.placeholder.com/80x80/1e293b/06b6d4?text=Producto",
    },
    {
      id: "2",
      name: "Accesorio Digital",
      quantity: 1,
      price: 59.99,
      image: "https://via.placeholder.com/80x80/1e293b/06b6d4?text=Accesorio",
    },
  ];

  useEffect(() => {
    // Ocultar animación después de 3 segundos
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadInvoice = () => {
    // Aquí iría la lógica para descargar la factura
    console.log("Descargando factura...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Success Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm">
          <div className="text-center">
            <DotLottieReact
              src="https://lottie.host/647e8c86-4d18-4a68-b9a0-189101976569/GON3dw5QH1.lottie"
              autoplay
              loop={false}
              className="w-64 h-64 mx-auto"
            />
            <p className="text-2xl font-bold text-cyan-400 mt-4 animate-pulse">
              Procesando tu pago...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 animate-bounce">
            <BiCheckCircle size={48} className="text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-100 mb-3">
            ¡Pago Exitoso!
          </h1>
          <p className="text-xl text-slate-300">
            Tu pedido ha sido confirmado
          </p>
        </div>

        {/* Order Information Card */}
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-slate-400 mb-1">Número de Pedido</p>
              <p className="text-xl font-bold text-cyan-400">{orderData.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Fecha del Pedido</p>
              <p className="text-lg font-semibold text-slate-100">{orderData.date}</p>
            </div>
          </div>

          <div className="h-px bg-slate-700 mb-8"></div>

          {/* What's Next Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <BiPackage size={24} className="text-cyan-400" />
              ¿Qué sigue?
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-cyan-400 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-slate-100 mb-2">Confirmación</h3>
                <p className="text-sm text-slate-400">
                  Recibirás un email de confirmación en los próximos minutos
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-cyan-400 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-slate-100 mb-2">Preparación</h3>
                <p className="text-sm text-slate-400">
                  Prepararemos tu pedido con mucho cuidado
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-cyan-400 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-slate-100 mb-2">Envío</h3>
                <p className="text-sm text-slate-400">
                  Lo enviaremos a tu dirección en {orderData.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-700 mb-8"></div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-100 mb-3">Método de Pago</h3>
              <p className="text-slate-300">{orderData.paymentMethod}</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 mb-3">Dirección de Envío</h3>
              <p className="text-slate-300">{orderData.shippingAddress}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-bold text-slate-100 mb-6">
            Productos Ordenados
          </h2>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-slate-700/30 rounded-lg p-4"
              >
                <div className="w-20 h-20 bg-slate-600 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-100">{item.name}</p>
                  <p className="text-sm text-slate-400">Cantidad: {item.quantity}</p>
                </div>
                <p className="text-lg font-bold text-cyan-400">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px bg-slate-700 my-6"></div>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-slate-100">Total Pagado:</span>
            <span className="text-2xl font-bold text-cyan-400">
              ${orderData.total}
            </span>
          </div>
        </div>

        {/* Email Notification */}
        <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <MdOutlineEmail size={32} className="text-cyan-400 shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-100 mb-2">
                Confirmación enviada
              </h3>
              <p className="text-slate-300 text-sm">
                Hemos enviado los detalles de tu pedido a{" "}
                <span className="font-semibold text-cyan-400">{orderData.email}</span>
              </p>
              <p className="text-slate-400 text-xs mt-2">
                Revisa tu bandeja de entrada y spam
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <ButtonAction
            onClick={handleDownloadInvoice}
            variant="secondary"
            className="w-full flex justify-center items-center gap-2"
            text="Descargar Factura"
          >
            <BiDownload size={20} />
          </ButtonAction>
          <ButtonAction
            onClick={() => navigate("/")}
            variant="primary"
            className="w-full flex justify-center items-center gap-2"
            text="Volver al Inicio"
          >
            <BiHome size={20} />
          </ButtonAction>
        </div>

        {/* Support Section */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            ¿Necesitas ayuda con tu pedido?{" "}
            <button className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Contáctanos
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashPaymentConfirmationPage;