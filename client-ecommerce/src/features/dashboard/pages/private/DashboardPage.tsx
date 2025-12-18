import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import NavMobile from "../../components/NavMobile";
import Stats from "../../components/Stats";
import RecentOrders from "../../components/RecentOrders";
import ShippingAddress from "../../components/ShippingAddress";
import PersonalProfile from "../../components/PersonalProfile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";

const DashboardPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Mobile Menu */}
        <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Mobile Menu Button */}
          <ButtonMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          {/* Stats Cards */}
          <Stats />

          {/* Recent Orders */}
          <RecentOrders />

          {/* Profile and Shipping Address */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Profile */}
            <PersonalProfile />

            {/* Shipping Address */}
            <ShippingAddress />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;