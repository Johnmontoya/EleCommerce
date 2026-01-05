import { MdOutlineFeaturedPlayList } from "react-icons/md";
import ButtonAction from "../../../shared/ui/ButtonAction";
import { toast } from "sonner";
import { AiFillStar } from "react-icons/ai";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import type React from "react";

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

interface ProductConfigProps {
    configurations: ProductDisplayConfig[];
    setConfigurations: React.Dispatch<React.SetStateAction<ProductDisplayConfig[]>>;
    handleOpenModal: (config?: ProductDisplayConfig) => void;
    sectionOptions: { value: DisplaySection; label: string; icon: React.ReactNode; color: string }[];
}

const ProductConfig: React.FC<ProductConfigProps> = ({
    configurations,
    setConfigurations,
    handleOpenModal,
    sectionOptions
}) => {
    const getSectionIcon = (section: DisplaySection) => {
        return sectionOptions.find(opt => opt.value === section)?.icon;
    };

    const getSectionColor = (section: DisplaySection) => {
        return sectionOptions.find(opt => opt.value === section)?.color;
    };

    const handleDeleteConfiguration = (id: string) => {
        setConfigurations(configurations.filter(c => c.id !== id));
        toast.success("Configuración eliminada");
    };

    const handlePriorityChange = (id: string, newPriority: number) => {
        setConfigurations(configurations.map(c =>
            c.id === id ? { ...c, displayPriority: newPriority } : c
        ));
    };

    return (
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-6">
                Productos Configurados
            </h2>

            {configurations.length === 0 ? (
                <div className="text-center py-12">
                    <MdOutlineFeaturedPlayList size={64} className="text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No hay productos configurados</p>
                    <ButtonAction
                        onClick={() => handleOpenModal()}
                        variant="secondary"
                        className="mt-4"
                        text="Agregar el primero"
                    >
                        <BiPlus size={20} />
                    </ButtonAction>
                </div>
            ) : (
                <div className="space-y-4">
                    {configurations
                        .sort((a, b) => a.displayPriority - b.displayPriority)
                        .map((config) => (
                            <div
                                key={config.id}
                                className="bg-slate-700/30 border-2 border-slate-600 rounded-xl p-4 hover:border-cyan-500/50 transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Product Image */}
                                    <div className="w-20 h-20 bg-slate-600 rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={config.productImage}
                                            alt={config.productName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-100 mb-1">
                                                    {config.productName}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-slate-400">
                                                        Prioridad:
                                                    </span>
                                                    <input
                                                        type="number"
                                                        value={config.displayPriority}
                                                        onChange={(e) => handlePriorityChange(config.id, parseInt(e.target.value) || 1)}
                                                        className="w-16 bg-slate-800 border border-slate-600 text-slate-100 px-2 py-1 rounded text-sm"
                                                        min="1"
                                                    />
                                                    {config.isFeatured && (
                                                        <span className="flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                                                            <AiFillStar size={12} />
                                                            Destacado
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(config)}
                                                    className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all"
                                                >
                                                    <BiEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteConfiguration(config.id)}
                                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                                                >
                                                    <BiTrash size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Sections Badges */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {config.displaySections.map((section) => (
                                                <span
                                                    key={section}
                                                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${getSectionColor(section)}`}
                                                >
                                                    {getSectionIcon(section)}
                                                    {sectionOptions.find(s => s.value === section)?.label}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Promotional Info */}
                                        {config.promotionalData && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                                {config.promotionalData.discount && (
                                                    <div className="bg-slate-800/50 rounded p-2">
                                                        <p className="text-slate-400 mb-1">Descuento</p>
                                                        <p className="text-cyan-400 font-semibold">
                                                            {config.promotionalData.discount}%
                                                        </p>
                                                    </div>
                                                )}
                                                {config.promotionalData.badgeText && (
                                                    <div className="bg-slate-800/50 rounded p-2">
                                                        <p className="text-slate-400 mb-1">Badge</p>
                                                        <p className="text-slate-100 font-semibold">
                                                            {config.promotionalData.badgeText}
                                                        </p>
                                                    </div>
                                                )}
                                                {config.promotionalData.startDate && (
                                                    <div className="bg-slate-800/50 rounded p-2">
                                                        <p className="text-slate-400 mb-1">Inicio</p>
                                                        <p className="text-slate-100 font-semibold">
                                                            {new Date(config.promotionalData.startDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                )}
                                                {config.promotionalData.endDate && (
                                                    <div className="bg-slate-800/50 rounded p-2">
                                                        <p className="text-slate-400 mb-1">Fin</p>
                                                        <p className="text-slate-100 font-semibold">
                                                            {new Date(config.promotionalData.endDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default ProductConfig;