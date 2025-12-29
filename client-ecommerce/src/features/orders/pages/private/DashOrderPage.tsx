import { useState } from "react";
import { BiCalendar, BiChevronDown, BiChevronUp, BiDollarCircle, BiExport, BiFilter, BiMap, BiPackage, BiSearch, BiUser } from "react-icons/bi";
import {
    MdLocalShipping,
    MdCheckCircle,
    MdCancel,
    MdPending,
    MdRefresh,
} from "react-icons/md";

interface OrderItem {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
}

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    total: number;
    items: OrderItem[];
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
    trackingNumber?: string;
}


const DashOrderPage = () => {

    const [orders, setOrders] = useState<Order[]>([
        {
            id: "1",
            orderNumber: "ORD-2024-001",
            date: "2024-12-20",
            status: "delivered",
            total: 1299.99,
            items: [
                {
                    id: "1",
                    productName: "AeroBlade Gaming Laptop",
                    quantity: 1,
                    price: 1299.99,
                    image:
                        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
                },
            ],
            customer: {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+57 300 123 4567",
            },
            shippingAddress: {
                street: "Carrera 13A #9-40",
                city: "Bogotá",
                state: "Cundinamarca",
                zipCode: "110111",
                country: "Colombia",
            },
            paymentMethod: "Tarjeta de Crédito",
            trackingNumber: "TRK123456789",
        },
        {
            id: "2",
            orderNumber: "ORD-2024-002",
            date: "2024-12-22",
            status: "shipped",
            total: 649.5,
            items: [
                {
                    id: "2",
                    productName: "Aura Wireless Headphones",
                    quantity: 1,
                    price: 249.0,
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                },
                {
                    id: "3",
                    productName: "MatrixPad Pro Tablet",
                    quantity: 1,
                    price: 400.5,
                    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
                },
            ],
            customer: {
                name: "Jane Smith",
                email: "jane.smith@example.com",
                phone: "+57 301 234 5678",
            },
            shippingAddress: {
                street: "Calle 80 #45-12",
                city: "Medellín",
                state: "Antioquia",
                zipCode: "050001",
                country: "Colombia",
            },
            paymentMethod: "PayPal",
            trackingNumber: "TRK987654321",
        },
        {
            id: "3",
            orderNumber: "ORD-2024-003",
            date: "2024-12-25",
            status: "processing",
            total: 999.0,
            items: [
                {
                    id: "4",
                    productName: "Quantum X Smartphone",
                    quantity: 1,
                    price: 999.0,
                    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
                },
            ],
            customer: {
                name: "Mike Wilson",
                email: "mike.wilson@example.com",
                phone: "+57 302 345 6789",
            },
            shippingAddress: {
                street: "Avenida El Poblado #10-20",
                city: "Cali",
                state: "Valle del Cauca",
                zipCode: "760001",
                country: "Colombia",
            },
            paymentMethod: "Transferencia Bancaria",
        },
        {
            id: "4",
            orderNumber: "ORD-2024-004",
            date: "2024-12-26",
            status: "pending",
            total: 329.0,
            items: [
                {
                    id: "5",
                    productName: "Chrono Smartwatch V2",
                    quantity: 1,
                    price: 329.0,
                    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
                },
            ],
            customer: {
                name: "Sarah Jones",
                email: "sarah.jones@example.com",
                phone: "+57 303 456 7890",
            },
            shippingAddress: {
                street: "Carrera 7 #32-45",
                city: "Barranquilla",
                state: "Atlántico",
                zipCode: "080001",
                country: "Colombia",
            },
            paymentMethod: "Efectivo",
        },
        {
            id: "5",
            orderNumber: "ORD-2024-005",
            date: "2024-12-15",
            status: "cancelled",
            total: 499.0,
            items: [
                {
                    id: "6",
                    productName: "Vortex Gaming Console",
                    quantity: 1,
                    price: 499.0,
                    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
                },
            ],
            customer: {
                name: "Robert Brown",
                email: "robert.brown@example.com",
                phone: "+57 304 567 8901",
            },
            shippingAddress: {
                street: "Calle 100 #18A-30",
                city: "Cartagena",
                state: "Bolívar",
                zipCode: "130001",
                country: "Colombia",
            },
            paymentMethod: "Tarjeta de Débito",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    // Filtrar pedidos
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            filterStatus === "all" || order.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Paginación
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Estadísticas
    const stats = {
        total: orders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        processing: orders.filter((o) => o.status === "processing").length,
        shipped: orders.filter((o) => o.status === "shipped").length,
        delivered: orders.filter((o) => o.status === "delivered").length,
        cancelled: orders.filter((o) => o.status === "cancelled").length,
        totalRevenue: orders
            .filter((o) => o.status !== "cancelled")
            .reduce((sum, o) => sum + o.total, 0),
    };

    const getStatusBadge = (status: Order["status"]) => {
        const styles = {
            pending: {
                bg: "bg-yellow-500/20",
                text: "text-yellow-400",
                border: "border-yellow-500/30",
                icon: <MdPending size={16} />,
                label: "Pendiente",
            },
            processing: {
                bg: "bg-blue-500/20",
                text: "text-blue-400",
                border: "border-blue-500/30",
                icon: <MdRefresh size={16} />,
                label: "Procesando",
            },
            shipped: {
                bg: "bg-purple-500/20",
                text: "text-purple-400",
                border: "border-purple-500/30",
                icon: <MdLocalShipping size={16} />,
                label: "Enviado",
            },
            delivered: {
                bg: "bg-green-500/20",
                text: "text-green-400",
                border: "border-green-500/30",
                icon: <MdCheckCircle size={16} />,
                label: "Entregado",
            },
            cancelled: {
                bg: "bg-red-500/20",
                text: "text-red-400",
                border: "border-red-500/30",
                icon: <MdCancel size={16} />,
                label: "Cancelado",
            },
        };

        const style = styles[status];

        return (
            <span
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}
            >
                {style.icon}
                {style.label}
            </span>
        );
    };

    const handleToggleExpand = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
        setOrders(
            orders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
                        <BiPackage className="text-cyan-400" size={36} />
                        Gestión de Pedidos
                    </h1>
                    <p className="text-slate-400">
                        {filteredOrders.length} pedido(s) encontrado(s)
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-xs mb-1">Total</p>
                        <p className="text-2xl font-bold text-slate-100">{stats.total}</p>
                    </div>
                    <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-yellow-400 text-xs mb-1">Pendientes</p>
                        <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
                    </div>
                    <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-blue-400 text-xs mb-1">Procesando</p>
                        <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
                    </div>
                    <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-purple-400 text-xs mb-1">Enviados</p>
                        <p className="text-2xl font-bold text-purple-400">{stats.shipped}</p>
                    </div>
                    <div className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-green-400 text-xs mb-1">Entregados</p>
                        <p className="text-2xl font-bold text-green-400">{stats.delivered}</p>
                    </div>
                    <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-red-400 text-xs mb-1">Cancelados</p>
                        <p className="text-2xl font-bold text-red-400">{stats.cancelled}</p>
                    </div>
                    <div className="bg-cyan-500/10 border-2 border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-cyan-400 text-xs mb-1">Ingresos</p>
                        <p className="text-lg font-bold text-cyan-400">
                            ${stats.totalRevenue.toFixed(0)}
                        </p>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-4 backdrop-blur-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <BiSearch
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por número de orden, cliente o email..."
                                className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            />
                        </div>

                        {/* Filter Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${showFilters
                                    ? "bg-cyan-500 text-white"
                                    : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                                }`}
                        >
                            <BiFilter size={20} />
                            Filtros
                        </button>

                        {/* Export Button */}
                        <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-3 rounded-lg font-semibold transition-all">
                            <BiExport size={20} />
                            Exportar
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <label className="block text-slate-300 text-sm font-semibold mb-2">
                                Filtrar por Estado
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full md:w-64 bg-slate-700/50 border border-slate-600 text-slate-100 px-4 py-2 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="pending">Pendiente</option>
                                <option value="processing">Procesando</option>
                                <option value="shipped">Enviado</option>
                                <option value="delivered">Entregado</option>
                                <option value="cancelled">Cancelado</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {paginatedOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-cyan-500/50 transition-all"
                        >
                            {/* Order Header */}
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-slate-100">
                                                {order.orderNumber}
                                            </h3>
                                            {getStatusBadge(order.status)}
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <BiCalendar size={16} />
                                                {new Date(order.date).toLocaleDateString("es-ES", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BiUser size={16} />
                                                {order.customer.name}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BiDollarCircle size={16} />
                                                ${order.total.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleToggleExpand(order.id)}
                                            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                                        >
                                            {expandedOrder === order.id ? (
                                                <>
                                                    <BiChevronUp size={18} />
                                                    Ocultar
                                                </>
                                            ) : (
                                                <>
                                                    <BiChevronDown size={18} />
                                                    Ver Detalles
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Order Details (Expandible) */}
                            {expandedOrder === order.id && (
                                <div className="border-t border-slate-700 p-6 bg-slate-900/30">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Items */}
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-100 mb-4">
                                                Productos ({order.items.length})
                                            </h4>
                                            <div className="space-y-3">
                                                {order.items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-lg"
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.productName}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1">
                                                            <p className="text-slate-100 font-semibold">
                                                                {item.productName}
                                                            </p>
                                                            <p className="text-slate-400 text-sm">
                                                                Cantidad: {item.quantity} × ${item.price}
                                                            </p>
                                                        </div>
                                                        <p className="text-cyan-400 font-bold">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Customer & Shipping Info */}
                                        <div className="space-y-4">
                                            {/* Customer */}
                                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                                <h4 className="text-lg font-bold text-slate-100 mb-3 flex items-center gap-2">
                                                    <BiUser className="text-cyan-400" size={20} />
                                                    Cliente
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <p className="text-slate-300">
                                                        <span className="text-slate-500">Nombre:</span>{" "}
                                                        {order.customer.name}
                                                    </p>
                                                    <p className="text-slate-300">
                                                        <span className="text-slate-500">Email:</span>{" "}
                                                        {order.customer.email}
                                                    </p>
                                                    <p className="text-slate-300">
                                                        <span className="text-slate-500">Teléfono:</span>{" "}
                                                        {order.customer.phone}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Shipping */}
                                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                                <h4 className="text-lg font-bold text-slate-100 mb-3 flex items-center gap-2">
                                                    <BiMap className="text-cyan-400" size={20} />
                                                    Dirección de Envío
                                                </h4>
                                                <div className="text-sm text-slate-300">
                                                    <p>{order.shippingAddress.street}</p>
                                                    <p>
                                                        {order.shippingAddress.city},{" "}
                                                        {order.shippingAddress.state}
                                                    </p>
                                                    <p>
                                                        {order.shippingAddress.zipCode},{" "}
                                                        {order.shippingAddress.country}
                                                    </p>
                                                </div>
                                                {order.trackingNumber && (
                                                    <div className="mt-3 pt-3 border-t border-slate-700">
                                                        <p className="text-slate-500 text-xs mb-1">
                                                            Tracking:
                                                        </p>
                                                        <p className="text-cyan-400 font-semibold">
                                                            {order.trackingNumber}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Payment */}
                                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                                <h4 className="text-lg font-bold text-slate-100 mb-3">
                                                    Método de Pago
                                                </h4>
                                                <p className="text-slate-300">{order.paymentMethod}</p>
                                            </div>

                                            {/* Update Status */}
                                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                                <h4 className="text-lg font-bold text-slate-100 mb-3">
                                                    Actualizar Estado
                                                </h4>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        handleUpdateStatus(
                                                            order.id,
                                                            e.target.value as Order["status"]
                                                        )
                                                    }
                                                    className="w-full bg-slate-700 border border-slate-600 text-slate-100 px-4 py-2 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
                                                >
                                                    <option value="pending">Pendiente</option>
                                                    <option value="processing">Procesando</option>
                                                    <option value="shipped">Enviado</option>
                                                    <option value="delivered">Entregado</option>
                                                    <option value="cancelled">Cancelado</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-12 text-center backdrop-blur-sm">
                        <BiPackage size={64} className="mx-auto text-slate-600 mb-4" />
                        <p className="text-slate-400 text-lg mb-2">
                            No se encontraron pedidos
                        </p>
                        <p className="text-slate-500 text-sm">
                            Intenta ajustar los filtros de búsqueda
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {filteredOrders.length > 0 && (
                    <div className="mt-6 flex items-center justify-between bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm">
                            Mostrando {(currentPage - 1) * itemsPerPage + 1} -{" "}
                            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} de{" "}
                            {filteredOrders.length} pedidos
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page
                                                ? "bg-cyan-500 text-white"
                                                : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}

                            <button
                                onClick={() =>
                                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                                }
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashOrderPage;