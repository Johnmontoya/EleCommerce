import React, { useState } from "react";
import { BiPackage } from "react-icons/bi";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import TrackingSearch from "../../components/TrackingSearch";
import useInputs from "../../../../shared/hooks/useInputs";
import CardStatus from "../../components/CardStatus";
import MapSection from "../../components/MapSection";
import TrackingTimeLine from "../../components/TrackingTimeLine";
import PackageDetails from "../../components/PackageDetails";

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  date: string;
  time: string;
  completed: boolean;
}

interface PackageInfo {
  trackingNumber: string;
  orderNumber: string;
  status: "pending" | "processing" | "shipped" | "in_transit" | "out_for_delivery" | "delivered";
  estimatedDelivery: string;
  origin: string;
  destination: string;
  weight: string;
  dimensions: string;
  carrier: string;
  currentLocation: string;
}

const DashTrackPage: React.FC = () => {
  const [trackingLoading, setTrackingLoading] = useState<boolean>(false);
  const [isTracking, onChangeTracking, setIsTracking] = useInputs({
    trackingNumber: "",
  });
  const [packageData, setPackageData] = useState<PackageInfo | null>(null);

  // Datos de ejemplo
  const mockPackageData: PackageInfo = {
    trackingNumber: "TK-2026001234567",
    orderNumber: "ORD-2026-001234",
    status: "in_transit",
    estimatedDelivery: "Martes, 7 Enero 2026",
    origin: "Centro de Distribución - Bogotá",
    destination: "Calle 123 #45-67, Bogotá, Colombia",
    weight: "2.5 kg",
    dimensions: "30 x 20 x 15 cm",
    carrier: "Express Delivery",
    currentLocation: "Centro de Distribución Local",
  };

  const trackingHistory: TrackingEvent[] = [
    {
      id: "1",
      status: "Pedido Confirmado",
      description: "Tu pedido ha sido confirmado y está siendo preparado",
      location: "Tienda Online",
      date: "03 Ene 2026",
      time: "09:30 AM",
      completed: true,
    },
    {
      id: "2",
      status: "En Preparación",
      description: "Tu pedido está siendo empaquetado",
      location: "Centro de Distribución - Bogotá",
      date: "03 Ene 2026",
      time: "11:45 AM",
      completed: true,
    },
    {
      id: "3",
      status: "Enviado",
      description: "El paquete ha salido del centro de distribución",
      location: "Centro de Distribución - Bogotá",
      date: "03 Ene 2026",
      time: "02:15 PM",
      completed: true,
    },
    {
      id: "4",
      status: "En Tránsito",
      description: "Tu paquete está en camino al centro de distribución local",
      location: "En ruta",
      date: "03 Ene 2026",
      time: "04:30 PM",
      completed: true,
    },
    {
      id: "5",
      status: "En Reparto",
      description: "El paquete está con el repartidor y será entregado hoy",
      location: "Centro de Distribución Local",
      date: "04 Ene 2026",
      time: "Estimado",
      completed: false,
    },
    {
      id: "6",
      status: "Entregado",
      description: "El paquete será entregado en tu dirección",
      location: "Calle 123 #45-67",
      date: "07 Ene 2026",
      time: "Estimado",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <BreadCrumbs />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BiPackage size={36} className="text-cyan-400" />
          <h1 className="text-4xl font-bold text-slate-100">Rastrear Envío</h1>
        </div>

        {/* Tracking Input */}
        <TrackingSearch
          trackingLoading={trackingLoading}
          setTrackingLoading={setTrackingLoading}
          onChangeTracking={onChangeTracking}
          isTracking={isTracking}
        />

        {/* Tracking Results */}
        {packageData && (
          <>
            {/* Status Overview */}
            <CardStatus
              packageData={packageData}
            />

            {/* Map Section */}
            <MapSection />

            {/* Tracking Timeline & Package Details */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Tracking Timeline */}
              <TrackingTimeLine
                trackingHistory={trackingHistory}
              />

              {/* Package Details Sidebar */}
              <PackageDetails packageData={packageData} />
            </div>
          </>
        )}

        {/* Empty State */}
        {!packageData && !isTracking && (
          <div className="text-center py-12">
            <BiPackage size={64} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">
              Ingresa tu número de rastreo para ver el estado de tu envío
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashTrackPage;