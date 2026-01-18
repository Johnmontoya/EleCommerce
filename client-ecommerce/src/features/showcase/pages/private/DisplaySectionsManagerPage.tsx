import React, { useState } from "react";
import { BiPlus, BiImage, BiTrendingUp } from "react-icons/bi";
import { MdOutlineFeaturedPlayList, MdNewReleases } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { FaBullhorn } from "react-icons/fa";
import ButtonAction from "../../../../shared/ui/ButtonAction";
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

    const sectionOptions: { value: DisplaySection; label: string; icon: React.ReactNode; color: string }[] = [
        { value: "banner", label: "Banner Principal", icon: <BiImage size={20} />, color: "card-shipped text-slate-300" },
        { value: "featured", label: "Destacados", icon: <AiFillStar size={20} />, color: "card-pending text-slate-300" },
        { value: "trending", label: "Tendencias", icon: <BiTrendingUp size={20} />, color: "card-completed text-slate-300" },
        { value: "promotional", label: "Promocional", icon: <FaBullhorn size={20} />, color: "card-cancelled text-slate-300" },
        { value: "new-arrival", label: "Nuevo Ingreso", icon: <MdNewReleases size={20} />, color: "card-refunded text-slate-300" },
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
        <div className="min-h-screen background-light dark:background-dark">
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
                            <ButtonAction
                                onClick={() => handleOpenModal()}
                                variant="primary"
                                className="flex items-center gap-2"
                                text="Agregar Producto"
                            >
                                <BiPlus size={20} />
                            </ButtonAction>
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
                                        className={`${section.color} border-2 rounded-xl p-4 transition-all hover:scale-105`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            {section.icon}
                                            <span className="font-semibold text-sm">{section.label}</span>
                                        </div>
                                        <p className="text-2xl font-bold">{count}</p>
                                        <p className="text-xs opacity-80">productos</p>
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