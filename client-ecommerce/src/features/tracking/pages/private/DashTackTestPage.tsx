import React, { useState } from "react";
import { BiPackage, BiSearch, BiMapPin, BiPhone, BiTime, BiCheckCircle } from "react-icons/bi";
import { MdLocalShipping, MdOutlineWarehouse } from "react-icons/md";
import { FaBoxOpen, FaShippingFast } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";

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

const DashTackTestPage: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isTracking, setIsTracking] = useState(false);
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

    const handleTrackPackage = () => {
        if (!trackingNumber.trim()) {
            return;
        }
        setIsTracking(true);
        // Simular búsqueda
        setTimeout(() => {
            setPackageData(mockPackageData);
            setIsTracking(false);
        }, 1500);
    };

    const getStatusIcon = (index: number) => {
        const icons = [
            <BiCheckCircle size={24} />,
            <FaBoxOpen size={24} />,
            <MdOutlineWarehouse size={24} />,
            <MdLocalShipping size={24} />,
            <FaShippingFast size={24} />,
            <IoLocationSharp size={24} />,
        ];
        return icons[index] || <BiPackage size={24} />;
    };

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
                <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-slate-100 mb-4">
                        Ingresa tu número de rastreo
                    </h2>
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <BiSearch
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleTrackPackage()}
                                placeholder="Ej: TK-2026001234567"
                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 pl-12 pr-4 py-4 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>
                        <ButtonAction
                            onClick={handleTrackPackage}
                            variant="primary"
                            className="px-8 flex items-center gap-2"
                            text={isTracking ? "Buscando..." : "Rastrear"}
                            disabled={isTracking}
                        >
                            {isTracking ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <BiSearch size={20} />
                            )}
                        </ButtonAction>
                    </div>
                    <p className="text-slate-400 text-sm mt-3">
                        Puedes encontrar tu número de rastreo en el email de confirmación
                    </p>
                </div>

                {/* Tracking Results */}
                {packageData && (
                    <>
                        {/* Status Overview */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* Current Status Card */}
                            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                                        <MdLocalShipping size={24} className="text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Estado Actual</p>
                                        <p className="text-xl font-bold text-cyan-400">En Tránsito</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Número de Rastreo</span>
                                        <span className="text-slate-100 font-semibold">
                                            {packageData.trackingNumber}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Número de Pedido</span>
                                        <span className="text-slate-100 font-semibold">
                                            {packageData.orderNumber}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Transportadora</span>
                                        <span className="text-slate-100 font-semibold">
                                            {packageData.carrier}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Info Card */}
                            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <BiTime size={24} className="text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Entrega Estimada</p>
                                        <p className="text-xl font-bold text-green-400">
                                            {packageData.estimatedDelivery}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-slate-400 text-sm mb-1">Ubicación Actual</p>
                                        <p className="text-slate-100 font-semibold flex items-center gap-2">
                                            <BiMapPin size={16} className="text-cyan-400" />
                                            {packageData.currentLocation}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm mb-1">Destino</p>
                                        <p className="text-slate-100 font-semibold flex items-center gap-2">
                                            <IoLocationSharp size={16} className="text-green-400" />
                                            {packageData.destination}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 mb-8">
                            <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                                <BiMapPin size={24} className="text-cyan-400" />
                                Ubicación del Paquete
                            </h2>
                            <div className="relative h-80 bg-slate-700/50 rounded-xl overflow-hidden">
                                {/* Mapa simulado con marcadores */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                                    {/* Grid pattern */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="w-full h-full" style={{
                                            backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
                                            backgroundSize: '50px 50px'
                                        }}></div>
                                    </div>

                                    {/* Route line */}
                                    <svg className="absolute inset-0 w-full h-full">
                                        <defs>
                                            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M 80 320 Q 200 200, 320 240 T 560 180"
                                            stroke="url(#routeGradient)"
                                            strokeWidth="4"
                                            fill="none"
                                            strokeDasharray="10,5"
                                            className="animate-pulse"
                                        />
                                    </svg>

                                    {/* Origin marker */}
                                    <div className="absolute left-20 bottom-10 transform -translate-x-1/2">
                                        <div className="relative">
                                            <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping absolute"></div>
                                            <div className="w-4 h-4 bg-cyan-500 rounded-full relative"></div>
                                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                                <p className="text-xs text-cyan-400 font-semibold bg-slate-900/90 px-2 py-1 rounded">
                                                    Origen
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Current location marker (animated) */}
                                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="relative animate-bounce">
                                            <MdLocalShipping size={32} className="text-yellow-400" />
                                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                                <p className="text-xs text-yellow-400 font-semibold bg-slate-900/90 px-2 py-1 rounded">
                                                    En Tránsito
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Destination marker */}
                                    <div className="absolute right-20 top-20 transform translate-x-1/2">
                                        <div className="relative">
                                            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                                <p className="text-xs text-green-400 font-semibold bg-slate-900/90 px-2 py-1 rounded">
                                                    Destino
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tracking Timeline & Package Details */}
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Tracking Timeline */}
                            <div className="lg:col-span-2">
                                <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                                    <h2 className="text-xl font-bold text-slate-100 mb-6">
                                        Historial de Seguimiento
                                    </h2>

                                    <div className="space-y-4">
                                        {trackingHistory.map((event, index) => (
                                            <div key={event.id} className="flex gap-4">
                                                {/* Timeline Icon */}
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${event.completed
                                                            ? "bg-cyan-500/20 text-cyan-400"
                                                            : "bg-slate-700/50 text-slate-500"
                                                            }`}
                                                    >
                                                        {getStatusIcon(index)}
                                                    </div>
                                                    {index < trackingHistory.length - 1 && (
                                                        <div
                                                            className={`w-0.5 h-16 ${event.completed ? "bg-cyan-500/50" : "bg-slate-700"
                                                                }`}
                                                        ></div>
                                                    )}
                                                </div>

                                                {/* Event Details */}
                                                <div className="flex-1 pb-8">
                                                    <div className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3
                                                                className={`font-bold ${event.completed ? "text-slate-100" : "text-slate-500"
                                                                    }`}
                                                            >
                                                                {event.status}
                                                            </h3>
                                                            {event.completed && (
                                                                <BiCheckCircle size={20} className="text-green-400" />
                                                            )}
                                                        </div>
                                                        <p
                                                            className={`text-sm mb-2 ${event.completed ? "text-slate-300" : "text-slate-500"
                                                                }`}
                                                        >
                                                            {event.description}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-xs">
                                                            <span
                                                                className={`flex items-center gap-1 ${event.completed ? "text-slate-400" : "text-slate-600"
                                                                    }`}
                                                            >
                                                                <BiMapPin size={14} />
                                                                {event.location}
                                                            </span>
                                                            <span
                                                                className={`flex items-center gap-1 ${event.completed ? "text-slate-400" : "text-slate-600"
                                                                    }`}
                                                            >
                                                                <BiTime size={14} />
                                                                {event.date} - {event.time}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Package Details Sidebar */}
                            <div className="space-y-6">
                                {/* Package Info */}
                                <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                                    <h2 className="text-xl font-bold text-slate-100 mb-4">
                                        Detalles del Paquete
                                    </h2>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-slate-400 text-sm mb-1">Peso</p>
                                            <p className="text-slate-100 font-semibold">{packageData.weight}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-sm mb-1">Dimensiones</p>
                                            <p className="text-slate-100 font-semibold">
                                                {packageData.dimensions}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-sm mb-1">Origen</p>
                                            <p className="text-slate-100 font-semibold">{packageData.origin}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Contact */}
                                <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                                    <h2 className="text-xl font-bold text-slate-100 mb-4">
                                        Información de Contacto
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                                                <BiPhone size={20} className="text-cyan-400" />
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-sm">Servicio al Cliente</p>
                                                <p className="text-slate-100 font-semibold">+57 300 123 4567</p>
                                            </div>
                                        </div>
                                        <ButtonAction
                                            onClick={() => { }}
                                            variant="secondary"
                                            className="w-full"
                                            text="Contactar Soporte"
                                        >
                                            <BiMapPin size={20} className="text-cyan-400" />
                                        </ButtonAction>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-xl p-4">
                                    <h3 className="text-sm font-semibold text-cyan-400 mb-2">
                                        ¿Problema con tu envío?
                                    </h3>
                                    <p className="text-slate-300 text-xs mb-3">
                                        Si tienes algún problema, contáctanos inmediatamente
                                    </p>
                                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                                        Reportar un problema →
                                    </button>
                                </div>
                            </div>
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

export default DashTackTestPage;