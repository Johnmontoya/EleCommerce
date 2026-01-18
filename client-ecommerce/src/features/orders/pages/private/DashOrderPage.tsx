import { useState } from "react";
import { BiPackage } from "react-icons/bi";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import DashHeader from "../../../../shared/ui/DashHeader";
import StatsInfo from "../../components/listOrders/StatsInfo";
import OrdersFilter from "../../components/listOrders/OrdersFilter";
import OrderList from "../../components/OrderList";
import { useOrderUser } from "../../hook/queries/useOrder";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import Pagination from "../../../../shared/ui/Pagination";

const DashOrderPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: orders, isLoading } = useOrderUser();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Calcular índices para "cortar" la lista
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Estos son los usuarios que vas a mostrar en la tabla (IMPORTANTE)
    const currentOrders = orders?.slice(indexOfFirstItem, indexOfLastItem) || [];

    // Filtrar pedidos
    const filteredOrders = orders?.filter((order) => {
        const matchesSearch =
            order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.status.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            filterStatus === "all" || order.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    if (isLoading) {
        return <LoadingFallback />
    }

    // Estadísticas
    const stats = {
        total: orders!.length,
        pending: orders!.filter((o) => o.status === "PENDING").length,
        confirmed: orders!.filter((o) => o.status === "CONFIRMED").length,
        processing: orders!.filter((o) => o.status === "PROCESSING").length,
        shipped: orders!.filter((o) => o.status === "SHIPPED").length,
        delivered: orders!.filter((o) => o.status === "DELIVERED").length,
        cancelled: orders!.filter((o) => o.status === "CANCELLED").length,
        refunded: orders!.filter((o) => o.status === "REFUNDED").length,
        totalRevenue: orders!
            .filter((o) => o.status !== "cancelled")
            .reduce((sum, o) => sum + o.total, 0),
    };

    const handleToggleExpand = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className={`min-h-screen background-light dark:background-dark`}>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    {/* Mobile Menu */}
                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-8 md:px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        {/* Header */}
                        <DashHeader
                            data={orders}
                            title="Gestion de Pedidos"
                            titleData="Pedido"
                            path="orders"
                            titleIcon={<BiPackage className="text-cyan-400" size={36} />}
                            list={false}
                        />

                        <p className="text-slate-400">
                            {filteredOrders?.length} pedido(s) encontrado(s)
                        </p>

                        <div className="w-full mx-auto py-8">
                            <StatsInfo stats={stats} isAdmin={false} />

                            <OrdersFilter
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                showFilters={showFilters}
                                setShowFilters={setShowFilters}
                                filterStatus={filterStatus}
                                setFilterStatus={setFilterStatus}
                            />

                            <OrderList
                                orders={currentOrders}
                                expandedOrder={expandedOrder}
                                handleToggleExpand={handleToggleExpand}
                            />

                            <Pagination
                                title="pedidos"
                                data={orders}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                itemsPerPage={itemsPerPage}
                                indexOfFirstItem={indexOfFirstItem}
                                indexOfLastItem={indexOfLastItem}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashOrderPage;