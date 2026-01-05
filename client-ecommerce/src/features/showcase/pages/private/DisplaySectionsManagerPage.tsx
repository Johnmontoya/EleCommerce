import React, { useState } from "react";
import { BiPlus, BiSave, BiX, BiImage, BiTag, BiTrendingUp } from "react-icons/bi";
import { MdOutlineFeaturedPlayList, MdNewReleases } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { FaBullhorn } from "react-icons/fa";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import useInputs from "../../../../shared/hooks/useInputs";
import { toast } from "sonner";
import ProductConfig from "../../components/ProductConfig";

type DisplaySection = 'banner' | 'featured' | 'trending' | 'promotional' | 'new-arrival';

interface PromotionalData {
    startDate?: string;
    endDate?: string;
    discount?: number;
    badgeText?: string;
    bannerImageUrl?: string;
}

interface ProductDisplayConfig {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    displaySections: DisplaySection[];
    displayPriority: number;
    isFeatured: boolean;
    promotionalData?: PromotionalData;
    featuredUntil?: string;
}

const DisplaySectionsManagerPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingConfig, setEditingConfig] = useState<ProductDisplayConfig | null>(null);

    // Mock data de productos configurados
    const [configurations, setConfigurations] = useState<ProductDisplayConfig[]>([
        {
            id: "1",
            productId: "prod-001",
            productName: "iPhone 15 Pro Max",
            productImage: "https://via.placeholder.com/100x100/1e293b/06b6d4?text=iPhone",
            displaySections: ["banner", "featured"],
            displayPriority: 1,
            isFeatured: true,
            promotionalData: {
                startDate: "2026-01-01",
                endDate: "2026-01-31",
                discount: 20,
                badgeText: "20% OFF",
                bannerImageUrl: "https://via.placeholder.com/1200x400/1e293b/06b6d4?text=iPhone+Banner",
            },
            featuredUntil: "2026-01-31",
        },
        {
            id: "2",
            productId: "prod-002",
            productName: "Samsung Galaxy S24",
            productImage: "https://via.placeholder.com/100x100/1e293b/06b6d4?text=Samsung",
            displaySections: ["trending", "new-arrival"],
            displayPriority: 2,
            isFeatured: false,
            featuredUntil: "2026-02-15",
        },
    ]);

    // Mock data de productos disponibles
    const availableProducts = [
        { id: "prod-001", name: "iPhone 15 Pro Max", image: "https://via.placeholder.com/50x50/1e293b/06b6d4?text=iPhone" },
        { id: "prod-002", name: "Samsung Galaxy S24", image: "https://via.placeholder.com/50x50/1e293b/06b6d4?text=Samsung" },
        { id: "prod-003", name: "MacBook Pro M3", image: "https://via.placeholder.com/50x50/1e293b/06b6d4?text=MacBook" },
        { id: "prod-004", name: "AirPods Pro 2", image: "https://via.placeholder.com/50x50/1e293b/06b6d4?text=AirPods" },
    ];

    const [formData, onChangeFormData, setFormData] = useInputs({
        productId: "",
        displaySections: [] as DisplaySection[],
        displayPriority: 1,
        isFeatured: false,
        startDate: "",
        endDate: "",
        discount: 0,
        badgeText: "",
        bannerImageUrl: "",
        featuredUntil: "",
    });

    const sectionOptions: { value: DisplaySection; label: string; icon: React.ReactNode; color: string }[] = [
        { value: "banner", label: "Banner Principal", icon: <BiImage size={20} />, color: "bg-purple-500/20 text-purple-400 border-purple-500" },
        { value: "featured", label: "Destacados", icon: <AiFillStar size={20} />, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500" },
        { value: "trending", label: "Tendencias", icon: <BiTrendingUp size={20} />, color: "bg-cyan-500/20 text-cyan-400 border-cyan-500" },
        { value: "promotional", label: "Promocional", icon: <FaBullhorn size={20} />, color: "bg-red-500/20 text-red-400 border-red-500" },
        { value: "new-arrival", label: "Nuevo Ingreso", icon: <MdNewReleases size={20} />, color: "bg-green-500/20 text-green-400 border-green-500" },
    ];

    const handleOpenModal = (config?: ProductDisplayConfig) => {
        if (config) {
            setEditingConfig(config);
            setFormData({
                productId: config.productId,
                displaySections: config.displaySections,
                displayPriority: config.displayPriority,
                isFeatured: config.isFeatured,
                startDate: config.promotionalData?.startDate || "",
                endDate: config.promotionalData?.endDate || "",
                discount: config.promotionalData?.discount || 0,
                badgeText: config.promotionalData?.badgeText || "",
                bannerImageUrl: config.promotionalData?.bannerImageUrl || "",
                featuredUntil: config.featuredUntil || "",
            });
        } else {
            setEditingConfig(null);
            setFormData({
                productId: "",
                displaySections: [],
                displayPriority: configurations.length + 1,
                isFeatured: false,
                startDate: "",
                endDate: "",
                discount: 0,
                badgeText: "",
                bannerImageUrl: "",
                featuredUntil: "",
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingConfig(null);
    };

    const handleToggleSection = (section: DisplaySection) => {
        const current = formData.displaySections as DisplaySection[];
        if (current.includes(section)) {
            setFormData({
                ...formData,
                displaySections: current.filter(s => s !== section),
            });
        } else {
            setFormData({
                ...formData,
                displaySections: [...current, section],
            });
        }
    };

    const handleSaveConfiguration = () => {
        if (!formData.productId) {
            toast.error("Selecciona un producto");
            return;
        }

        if (formData.displaySections.length === 0) {
            toast.error("Selecciona al menos una sección");
            return;
        }

        const product = availableProducts.find(p => p.id === formData.productId);
        if (!product) return;

        const newConfig: ProductDisplayConfig = {
            id: editingConfig?.id || `config-${Date.now()}`,
            productId: formData.productId,
            productName: product.name,
            productImage: product.image,
            displaySections: formData.displaySections,
            displayPriority: formData.displayPriority,
            isFeatured: formData.isFeatured,
            promotionalData: {
                startDate: formData.startDate,
                endDate: formData.endDate,
                discount: formData.discount,
                badgeText: formData.badgeText,
                bannerImageUrl: formData.bannerImageUrl,
            },
            featuredUntil: formData.featuredUntil,
        };

        if (editingConfig) {
            setConfigurations(configurations.map(c => c.id === editingConfig.id ? newConfig : c));
            toast.success("Configuración actualizada");
        } else {
            setConfigurations([...configurations, newConfig]);
            toast.success("Configuración creada");
        }

        handleCloseModal();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <BreadCrumbs />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <MdOutlineFeaturedPlayList size={36} className="text-cyan-400" />
                        <div>
                            <h1 className="text-4xl font-bold text-slate-100">Gestión de Secciones</h1>
                            <p className="text-slate-400 mt-1">
                                Administra dónde y cómo se muestran tus productos
                            </p>
                        </div>
                    </div>
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
                    {sectionOptions.map((section) => {
                        const count = configurations.filter(c =>
                            c.displaySections.includes(section.value)
                        ).length;

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
                    configurations={configurations}
                    setConfigurations={setConfigurations}
                    handleOpenModal={handleOpenModal}
                    sectionOptions={sectionOptions}
                />
            </div>

            {/* Modal de Configuración */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-100">
                                {editingConfig ? "Editar Configuración" : "Nueva Configuración"}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-700 rounded-lg transition-all"
                            >
                                <BiX size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Selección de Producto */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-3">
                                    Producto *
                                </label>
                                <select
                                    name="productId"
                                    value={formData.productId}
                                    onChange={onChangeFormData}
                                    disabled={!!editingConfig}
                                    className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                                >
                                    <option value="">Seleccionar producto</option>
                                    {availableProducts.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Secciones */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-3">
                                    Secciones de Visualización *
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {sectionOptions.map((section) => (
                                        <button
                                            key={section.value}
                                            onClick={() => handleToggleSection(section.value)}
                                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${(formData.displaySections as DisplaySection[]).includes(section.value)
                                                ? `${section.color} border-2`
                                                : "bg-slate-700/30 border-slate-600 text-slate-400 hover:border-slate-500"
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${(formData.displaySections as DisplaySection[]).includes(section.value)
                                                ? "bg-current/20"
                                                : "bg-slate-600"
                                                }`}>
                                                {section.icon}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold">{section.label}</p>
                                                <p className="text-xs opacity-70">
                                                    {section.value === "banner" && "Banner principal del sitio"}
                                                    {section.value === "featured" && "Productos destacados"}
                                                    {section.value === "trending" && "En tendencia"}
                                                    {section.value === "promotional" && "Sección de promociones"}
                                                    {section.value === "new-arrival" && "Nuevos ingresos"}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Configuración General */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                                        Prioridad de Visualización
                                    </label>
                                    <input
                                        type="number"
                                        name="displayPriority"
                                        value={formData.displayPriority}
                                        onChange={onChangeFormData}
                                        min="1"
                                        className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="1"
                                    />
                                    <p className="text-xs text-slate-400 mt-1">
                                        1 = Primera posición
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                                        Destacar hasta
                                    </label>
                                    <input
                                        type="date"
                                        name="featuredUntil"
                                        value={formData.featuredUntil}
                                        onChange={onChangeFormData}
                                        className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Destacado Toggle */}
                            <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    className="w-5 h-5 rounded border-2 border-yellow-500 bg-slate-700 checked:bg-yellow-500"
                                />
                                <div>
                                    <p className="font-semibold text-yellow-400 flex items-center gap-2">
                                        <AiFillStar size={18} />
                                        Marcar como Producto Destacado
                                    </p>
                                    <p className="text-xs text-slate-300">
                                        Aparecerá con un badge especial en todas las secciones
                                    </p>
                                </div>
                            </div>

                            {/* Datos Promocionales */}
                            <div className="border-2 border-slate-700 rounded-xl p-4">
                                <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                                    <BiTag size={20} className="text-cyan-400" />
                                    Datos Promocionales (Opcional)
                                </h3>

                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                                Fecha de Inicio
                                            </label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={onChangeFormData}
                                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                                Fecha de Fin
                                            </label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={onChangeFormData}
                                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                                Descuento (%)
                                            </label>
                                            <input
                                                type="number"
                                                name="discount"
                                                value={formData.discount}
                                                onChange={onChangeFormData}
                                                min="0"
                                                max="100"
                                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                                placeholder="20"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                                Texto del Badge
                                            </label>
                                            <input
                                                type="text"
                                                name="badgeText"
                                                value={formData.badgeText}
                                                onChange={onChangeFormData}
                                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                                placeholder="50% OFF, NUEVO, etc."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                                            URL de Imagen para Banner
                                        </label>
                                        <input
                                            type="url"
                                            name="bannerImageUrl"
                                            value={formData.bannerImageUrl}
                                            onChange={onChangeFormData}
                                            className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                            placeholder="https://ejemplo.com/banner.jpg"
                                        />
                                        <p className="text-xs text-slate-400 mt-1">
                                            Imagen específica para mostrar en el banner (recomendado 1200x400px)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6 flex gap-4">
                            <ButtonAction
                                onClick={handleCloseModal}
                                variant="secondary"
                                className="flex-1"
                                text="Cancelar"
                            >
                                <BiX size={20} />
                            </ButtonAction>
                            <ButtonAction
                                onClick={handleSaveConfiguration}
                                variant="primary"
                                className="flex-1 flex items-center justify-center gap-2"
                                text={editingConfig ? "Actualizar" : "Guardar"}
                            >
                                <BiSave size={20} />
                            </ButtonAction>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplaySectionsManagerPage;