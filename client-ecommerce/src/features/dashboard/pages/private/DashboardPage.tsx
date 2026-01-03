import React, { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import NavMobile from "../../components/NavMobile";
import Stats from "../../components/Stats";
import RecentOrders from "../../components/RecentOrders";
import ShippingAddress from "../../components/ShippingAddress";
import PersonalProfile from "../../components/PersonalProfile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import { useAuthStore } from "../../../../features/auth/store/useAuthStore";
import { useOrderAll, useOrderUser } from "../../../orders/hook/queries/useOrder";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import type { OrderResponse } from "../../../orders/types/order.types";
import Pagination from "../../../../shared/ui/Pagination";

const DashboardPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuthStore();

  const { data: dataAll, isLoading: isLoadingAll } = useOrderAll();
  const { data: dataUser, isLoading: isLoadingUser } = useOrderUser();

  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 10;

  const isLoading = isLoadingAll || isLoadingUser || !user;

  // Usamos useMemo para calcular todo de forma reactiva y segura
  const { dataOrders, totalOrders, pendingOrders, totalSpent } = useMemo(() => {
    if (!user) {
      return { dataOrders: [], totalOrders: 0, pendingOrders: 0, totalSpent: 0 };
    }

    let orders: OrderResponse[] = [];

    if (user.role === "ADMIN" && dataAll) {
      orders = dataAll;
    } else if (user.role === "USER" && dataUser) {
      orders = dataUser;
    }

    const total = orders.length;
    const pending = orders.filter((order) => order.status === "PENDING").length;
    const spent = orders.reduce((sum, order) => sum + order.total, 0);

    return {
      dataOrders: orders,
      totalOrders: total,
      pendingOrders: pending,
      totalSpent: spent, // más claro que "rewardPoints"
    };
  }, [user, dataAll, dataUser]);

  // Calcular índices para "cortar" la lista
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Estos son los usuarios que vas a mostrar en la tabla (IMPORTANTE)
  const currentOrders = dataOrders?.slice(indexOfFirstItem, indexOfLastItem) || [];

  if (isLoading) {
    return <LoadingFallback />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Mobile Menu */}
        <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <ButtonMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          {/* Stats Cards */}
          <Stats
            totalOrders={totalOrders}
            pendingOrders={pendingOrders}
            rewardPoints={totalSpent} // o cámbialo a totalSpent si no son puntos reales
          />

          {/* Recent Orders */}
          <RecentOrders data={currentOrders} />

          <Pagination
            title="pedidos"
            data={currentOrders}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
          />

          {/* Profile and Shipping Address */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <PersonalProfile user={user} />
            <ShippingAddress user={user} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;