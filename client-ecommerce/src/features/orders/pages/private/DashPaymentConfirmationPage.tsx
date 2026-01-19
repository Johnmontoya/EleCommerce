import React, { useEffect, useState } from "react";
import { BiCheckCircle, BiHome } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../../../../shared/ui/PdfReact";
import CardInformation from "../../components/pdfCard/CardInformation";
import OrderItems from "../../components/pdfCard/OrderItems";
import { useOrderTrackingNumber } from "../../hook/queries/useOrder";
import { useAuthStore } from "../../../auth/store/useAuthStore";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const DashPaymentConfirmationPage: React.FC = () => {
  const query = useQuery();
  const trackingNumber = query.get("trackingNumber");
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(true);
  const { user } = useAuthStore()

  const { data: order } = useOrderTrackingNumber(trackingNumber!);

  useEffect(() => {
    // Ocultar animación después de 3 segundos
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen background-light">
      {/* Success Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm">
          <div className="text-center">
            <DotLottieReact
              src="https://lottie.host/23df5b74-f4c6-47c9-b928-261e7155eb8d/ONtANo09KW.lottie"
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
            <BiCheckCircle size={48} className="text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-100 mb-3">
            ¡Pago Exitoso!
          </h1>
          <p className="text-xl text-slate-300">
            Tu pedido ha sido confirmado
          </p>
        </div>

        {/* Order Information Card */}
        <CardInformation orderData={order} />

        {/* Order Items */}
        <OrderItems orderData={order} orderItems={order?.items} />

        {/* Email Notification */}
        <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <MdOutlineEmail size={32} className="text-cyan-400 shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-100 mb-2">
                Confirmación enviada
              </h3>
              <p className="text-slate-300 text-sm">
                Hemos enviado los detalles de tu pedido a tu correo electrónico
              </p>
              <p className="text-slate-400 text-xs mt-2">
                Revisa tu bandeja de entrada y spam
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <PDFDownloadLink document={<PDF orderData={order} orderItems={order?.items} user={user} />} fileName="factura.pdf"
            className="w-full flex justify-center items-center bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer">
            {({ loading }) =>
              loading ? "Loading document..." : "Descargar factura"
            }
          </PDFDownloadLink>
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