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
        "inicio" | "pedidos" | "seguridad" | "preferencias"
    >("inicio");

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
        <div className="min-h-screen bg-[#020202] relative font-mono text-white flex">
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

            {/* Sidebar */}
            <div className="relative z-10 hidden lg:block">
                <Sidebar />
            </div>

            <div className="w-full flex-1 flex-col relative z-10">
                <div className="max-w-7xl px-0 md:px-9 mt-4">
                    <BreadCrumbs />
                </div>

                <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                <div className="w-full mx-auto flex-1 px-4 md:px-12 pb-8 mt-4">
                    <ButtonMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    {/* ID Badge Header */}
                    <div className="relative bg-[#050505] border border-zinc-800 mb-8 mt-12 md:mt-2">
                        {/* Accent Bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-[#00f0ff] to-[#e4ff00]"></div>

                        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                            {/* Technical Avatar Wrapper */}
                            <div className="relative shrink-0 -mt-16 md:-mt-12 group">
                                <div className="absolute inset-0 bg-[#00f0ff] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                                <div className="relative w-32 h-32 md:w-40 md:h-40 bg-[#020202] border-2 border-zinc-800 p-1">
                                    <img
                                        src={profile?.avatar || "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"}
                                        alt={`${profile?.firstName}`}
                                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                    {/* Scanner Grid Overlay */}
                                    <div className="absolute inset-1 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] MixBlendMode-overlay opacity-50"></div>

                                    {/* Corner Accents */}
                                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]"></div>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]"></div>
                                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff]"></div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]"></div>
                                </div>

                                <button className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#050505] border border-zinc-700 hover:border-[#00f0ff] text-zinc-400 hover:text-[#00f0ff] px-4 py-1 text-xs font-bold uppercase tracking-widest transition-all z-10 flex items-center justify-center gap-2">
                                    <BiCamera size={14} /> [ACTUALIZAR]
                                </button>
                            </div>

                            {/* Registry Info */}
                            <div className="flex-1 text-center md:text-left pt-2 md:pt-0">
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
                                    [IDENTIFICACIÓN_DEL_USUARIO]
                                </p>
                                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white mb-2 leading-none">
                                    {profile?.firstName || ""} {profile?.lastName || ""}
                                </h1>
                                <p className="text-[#00f0ff] font-bold tracking-widest uppercase mb-4 text-sm">
                                    @{profile?.username}
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    {getRoleBadge(profile?.role!)}
                                    {profile?.emailVerified && (
                                        <span className="bg-[#050505] text-[#e4ff00] border border-[#e4ff00]/30 px-3 py-1 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                            <MdVerifiedUser size={14} />
                                            [ESTADO_VERIFICADO]
                                        </span>
                                    )}
                                    <span className="bg-[#050505] text-zinc-400 border border-zinc-800 px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                        ID_SISTEMA: {profile?.id?.slice(0, 8) || 'UNKNOWN'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Panels */}
                    <div className="mb-8">
                        <StatsInfo stats={stats} />
                    </div>

                    {/* Terminal Navigation Tabs */}
                    <div className="flex flex-wrap border-b border-zinc-800 mb-8 overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab("inicio")}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "inicio"
                                ? "text-[#00f0ff] border-b-2 border-[#00f0ff] bg-[#00f0ff]/5"
                                : "text-zinc-500 border-b-2 border-transparent hover:text-zinc-300 hover:bg-zinc-900/50"
                                }`}
                        >
                            <BiUser size={16} />
                            [INICIO]
                        </button>
                        <button
                            onClick={() => setActiveTab("pedidos")}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "pedidos"
                                ? "text-[#00f0ff] border-b-2 border-[#00f0ff] bg-[#00f0ff]/5"
                                : "text-zinc-500 border-b-2 border-transparent hover:text-zinc-300 hover:bg-zinc-900/50"
                                }`}
                        >
                            <BiPackage size={16} />
                            [TRANSACCIONES]
                        </button>
                        <button
                            onClick={() => setActiveTab("seguridad")}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "seguridad"
                                ? "text-[#FF0055] border-b-2 border-[#FF0055] bg-[#FF0055]/5"
                                : "text-zinc-500 border-b-2 border-transparent hover:text-zinc-300 hover:bg-zinc-900/50"
                                }`}
                        >
                            <MdSecurity size={16} />
                            [SEGURIDAD]
                        </button>
                        <button
                            onClick={() => setActiveTab("preferencias")}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "preferencias"
                                ? "text-[#e4ff00] border-b-2 border-[#e4ff00] bg-[#e4ff00]/5"
                                : "text-zinc-500 border-b-2 border-transparent hover:text-zinc-300 hover:bg-zinc-900/50"
                                }`}
                        >
                            <MdNotifications size={16} />
                            [PREFERENCIAS]
                        </button>
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
    );
};

export default DashProfilePage;