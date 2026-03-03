import React, { useState } from "react";
import { BiPlus, BiImage, BiTrendingUp } from "react-icons/bi";
import { MdOutlineFeaturedPlayList, MdNewReleases } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { FaBullhorn } from "react-icons/fa";

import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import ProductConfig from "../../components/ProductConfig";
import Sidebar from "../../../dashboard/components/Sidebar";
import NavMobile from "../../../dashboard/components/NavMobile";
import ButtonMobile from "../../../../shared/ui/ButtonMobile";
import DashHeader from "../../../../shared/ui/DashHeader";
import MiModal from "../../../../shared/ui/Modal";
import { useBannerAll } from "../../hook/queries/useBanner";
import ModalShowcase from "../../components/ModalShowcase";
import type { Banner } from "../../types/banner.types";

type DisplaySection = 'banner' | 'featured' | 'trending' | 'promotional' | 'new-arrival';

const DisplaySectionsManagerPage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

    const { data: banners } = useBannerAll();

    const sectionOptions: { value: DisplaySection; label: string; icon: React.ReactNode; color: string; borderCode: string }[] = [
        { value: "banner", label: "[MAIN_BANNER]", icon: <BiImage size={20} />, color: "text-[#00f0ff]", borderCode: "border-[#00f0ff] bg-[#00f0ff]/5" },
        { value: "featured", label: "[FEATURED_ITEMS]", icon: <AiFillStar size={20} />, color: "text-[#e4ff00]", borderCode: "border-[#e4ff00] bg-[#e4ff00]/5" },
        { value: "trending", label: "[TRENDS_LOG]", icon: <BiTrendingUp size={20} />, color: "text-[#00f0ff]", borderCode: "border-[#00f0ff] bg-[#00f0ff]/5" },
        { value: "promotional", label: "[PROMO_ACTIONS]", icon: <FaBullhorn size={20} />, color: "text-[#ff0055]", borderCode: "border-[#ff0055] bg-[#ff0055]/5" },
        { value: "new-arrival", label: "[NEW_DROPS]", icon: <MdNewReleases size={20} />, color: "text-[#e4ff00]", borderCode: "border-[#e4ff00] bg-[#e4ff00]/5" },
    ];

    const handleOpenModal = (banner?: Banner) => {
        if (banner) {
            setEditingBanner(banner);
        } else {
            setEditingBanner(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingBanner(null);
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white font-mono selection:bg-[#00f0ff] selection:text-black">
            <div className="flex">
                <Sidebar />

                <div className="flex flex-col flex-1">
                    <div className="max-w-7xl px-0 md:px-9">
                        <BreadCrumbs />
                    </div>

                    <NavMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

                    <div className="w-full mx-auto flex-1 px-8 md:px-12 pb-8">
                        <ButtonMobile
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />

                        <DashHeader
                            data={banners!}
                            title="Gestión de Productos"
                            titleData="Producto"
                            path="products"
                            titleIcon={<MdOutlineFeaturedPlayList className="text-cyan-400" size={36} />}
                            list={false}
                        />

                        <div className="flex items-center justify-end mb-6">
                            <button
                                onClick={() => handleOpenModal()}
                                className="bg-[#e4ff00] text-black px-6 py-3 font-bold tracking-widest text-xs uppercase hover:bg-white transition-colors flex items-center gap-2"
                            >
                                <BiPlus size={18} />
                                [ADD_CONFIG]
                            </button>
                        </div>

                        {/* Sections Overview */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                            {sectionOptions?.map((section) => {
                                const count = banners?.filter(c =>
                                    c.displaySections?.includes(section.value)
                                ).length || 0;

                                return (
                                    <div
                                        key={section.value}
                                        className={`border border-zinc-800 bg-[#050505] p-4 transition-all hover:border-[#00f0ff] relative group overflow-hidden`}
                                    >
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${section.borderCode.split(' ')[0]} opacity-50 group-hover:opacity-100`} />
                                        <div className={`flex items-center gap-2 mb-2 ${section.color}`}>
                                            {section.icon}
                                            <span className="font-bold text-[10px] uppercase tracking-widest">{section.label}</span>
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <p className="text-3xl font-black text-white">{count}</p>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1 pb-1">ITEMS</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Configurations List */}
                        <ProductConfig
                            configurations={banners}
                            sectionOptions={sectionOptions}
                            onEdit={handleOpenModal}
                        />
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <MiModal
                            title=""
                            isOpen={showModal}
                            onClose={handleCloseModal}
                        >
                            <ModalShowcase
                                sectionOptions={sectionOptions}
                                onClose={handleCloseModal}
                                editingBanner={editingBanner}
                            />
                        </MiModal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisplaySectionsManagerPage;