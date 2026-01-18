import { useEffect, useState } from "react";
import { BiCamera, BiPackage, BiUser } from "react-icons/bi";
import { MdNotifications, MdSecurity, MdVerifiedUser } from "react-icons/md";
import { useProfile } from "../../hook/queries/useProfile";
import Sidebar from "../../../dashboard/components/Sidebar";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import StatsInfo from "../../components/StatsInfo";
import PersonalInfo from "../../components/PersonalInfo";
import OrderInfo from "../../components/OrderInfo";
import SecurityInfo from "../../components/SecurityInfo";
import PreferenceInfo from "../../components/PreferenceInfo";
import SideProfile from "../../components/SideProfile";
import { useOrderUser } from "../../../orders/hook/queries/useOrder";

interface Stats {
    totalOrders: number;
    totalSpent: number;
    wishlistItems: number;
    reviewsWritten: number;
}

const DashProfilePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<
        "overview" | "orders" | "security" | "preferences"
    >("overview");

    const { data: profile } = useProfile();
    const { data: orders } = useOrderUser();

    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    useEffect(() => {
        if (orders) {
            setTotalOrders(orders.length);
            setTotalSpent(orders.reduce((total, order) => total + order.total, 0));
        }
    }, [orders]);

    const wishlistItems = 12;
    const reviewsWritten = 12;

    const stats: Stats = {
        totalOrders,
        totalSpent,
        wishlistItems,
        reviewsWritten,
    };

    const getRoleBadge = (role: string) => {
        const styles = {
            admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
            moderator: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            vendor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
            customer: "bg-green-500/20 text-green-400 border-green-500/30",
        };

        const labels = {
            admin: "Administrador",
            moderator: "Moderador",
            vendor: "Vendedor",
            customer: "Cliente",
        };

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[role as keyof typeof styles] || styles.customer
                    }`}
            >
                {labels[role as keyof typeof labels] || role}
            </span>
        );
    };

    return (
        <div className="min-h-screen background-light dark:background-light">
            <div className="flex">
                <Sidebar />

                <div className="w-full flex-1 flex-col">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-8 md:px-12 pb-8">
                        <ButtonMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                        {/* Header with Cover */}
                        <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl h-48 mb-8 overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>

                            {/* Avatar */}
                            <div className="absolute -bottom-16 left-8">
                                <div className="relative">
                                    <img
                                        src={profile?.avatar || "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"}
                                        alt={`${profile?.firstName}`}
                                        className="w-32 h-32 rounded-full border-4 border-slate-900 object-cover"
                                    />
                                    <button className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-full transition-all shadow-lg">
                                        <BiCamera size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="absolute bottom-0 left-44 right-8 pb-4">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-1">
                                            {profile?.firstName || ""} {profile?.lastName || ""}
                                        </h1>
                                        <p className="text-white/80">@{profile?.username}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {getRoleBadge(profile?.role!)}
                                        {profile?.emailVerified && (
                                            <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                <MdVerifiedUser size={14} />
                                                Verificado
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Stats Cards */}
                        <StatsInfo stats={stats} />

                        {/* Tabs */}
                        <div className="dash-search dark:dash-search border border-slate-600 rounded-xl mb-6 overflow-hidden backdrop-blur-sm">
                            <div className="flex overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab("overview")}
                                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 ${activeTab === "overview"
                                        ? "border-cyan-400 text-cyan-400 bg-slate-700/50"
                                        : "border-transparent text-slate-300 hover:text-slate-200"
                                        }`}
                                >
                                    <BiUser size={20} />
                                    Información General
                                </button>
                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 ${activeTab === "orders"
                                        ? "border-cyan-400 text-cyan-400 bg-slate-700/50"
                                        : "border-transparent text-slate-300 hover:text-slate-200"
                                        }`}
                                >
                                    <BiPackage size={20} />
                                    Mis Pedidos
                                </button>
                                <button
                                    onClick={() => setActiveTab("security")}
                                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 ${activeTab === "security"
                                        ? "border-cyan-400 text-cyan-400 bg-slate-700/50"
                                        : "border-transparent text-slate-300 hover:text-slate-200"
                                        }`}
                                >
                                    <MdSecurity size={20} />
                                    Seguridad
                                </button>
                                <button
                                    onClick={() => setActiveTab("preferences")}
                                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 ${activeTab === "preferences"
                                        ? "border-cyan-400 text-cyan-400 bg-slate-700/50"
                                        : "border-transparent text-slate-300 hover:text-slate-200"
                                        }`}
                                >
                                    <MdNotifications size={20} />
                                    Preferencias
                                </button>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Content */}
                            <div className="w-full lg:col-span-2 space-y-6">
                                {/* Overview Tab */}
                                <PersonalInfo activeTab={activeTab} profile={profile} />
                                {/* Orders Tab */}
                                <OrderInfo activeTab={activeTab} orders={orders} />
                                {/* Security Tab */}
                                <SecurityInfo activeTab={activeTab} />
                                {/* Preferences Tab */}
                                <PreferenceInfo activeTab={activeTab} />
                            </div>
                            {/* Sidebar */}
                            <SideProfile profile={profile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashProfilePage;