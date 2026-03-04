import React, { useEffect, useState } from "react";
import { BiCheckCircle, BiHome } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-[#020202] relative font-mono text-white">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Success Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]/95 backdrop-blur-md">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" style={{
            backgroundImage: `linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
          <div className="text-center relative z-10">
            <DotLottieReact
              src="https://lottie.host/23df5b74-f4c6-47c9-b928-261e7155eb8d/ONtANo09KW.lottie"
              autoplay
              loop={false}
              className="w-64 h-64 mx-auto"
            />
            <p className="text-[#00f0ff] font-bold mt-4 animate-pulse uppercase tracking-widest text-sm">
              [PROCESSING_TRANSACTION...]
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-transparent border-2 border-[#00f0ff] rounded-none mb-6 animate-pulse">
            <BiCheckCircle size={40} className="text-[#00f0ff]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 tracking-widest uppercase">
            [PAYMENT_SUCCESSFUL]
          </h1>
          <p className="text-sm text-zinc-400 tracking-widest uppercase">
            [ORDER_CONFIRMED]
          </p>
        </div>

        {/* Order Information Card */}
        <CardInformation orderData={order} />

        {/* Order Items */}
        <OrderItems orderData={order} orderItems={order?.items} />

        {/* Email Notification */}
        <div className="bg-black border border-[#00f0ff]/30 p-6 mb-8 relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-[#00f0ff]" />
          <div className="flex items-start gap-4">
            <MdOutlineEmail size={24} className="text-[#00f0ff] shrink-0" />
            <div>
              <h3 className="font-bold text-[#00f0ff] mb-2 uppercase tracking-widest text-[12px]">
                [CONFIRMATION_DISPATCHED]
              </h3>
              <p className="text-zinc-400 text-[10px] uppercase tracking-widest">
                [ORDER_DETAILS_TRANSMITTED_TO_EMAIL_NODE]
              </p>
              <p className="text-zinc-600 text-[9px] uppercase tracking-widest mt-2">
                [VERIFY_INBOX_AND_SPAM_DIRECTORIES]
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          <PDFDownloadLink document={<PDF orderData={order} orderItems={order?.items} user={user} />} fileName="factura.pdf"
            className="w-full flex justify-center items-center bg-transparent border border-zinc-700 hover:border-[#e4ff00] text-zinc-400 hover:text-[#e4ff00] px-6 py-4 rounded-none font-bold uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 cursor-pointer">
            {({ loading }) =>
              loading ? "[GENERATING_DOCUMENT...]" : "[DOWNLOAD_INVOICE]"
            }
          </PDFDownloadLink>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full flex justify-center items-center gap-2 bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/20 px-6 py-4 rounded-none font-bold uppercase tracking-widest text-[10px] transition-all"
          >
            <BiHome size={16} />
            [RETURN_TO_BASE]
          </button>
        </div>

        {/* Support Section */}
        <div className="text-center mt-12 bg-black border border-zinc-800 p-4">
          <p className="text-zinc-400 text-[10px] uppercase tracking-widest">
            [SUPPORT_REQUIRED?] {" "}
            <button className="text-[#ff0055] hover:text-white font-bold transition-colors">
              [INITIATE_CONTACT]
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashPaymentConfirmationPage;